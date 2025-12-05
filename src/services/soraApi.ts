import { getModelName, type VideoDuration, type VideoAspect } from '../types';

interface GenerateVideoParams {
    apiEndpoint: string;
    apiKey: string;
    prompt: string;
    duration: VideoDuration;
    aspect: VideoAspect;
    imageBase64?: string;
    onProgress?: (progress: number) => void;
}

export async function generateVideo(params: GenerateVideoParams): Promise<string> {
    const { apiEndpoint, apiKey, prompt, duration, aspect, imageBase64, onProgress } = params;

    const model = getModelName(duration, aspect);

    // 构建消息内容
    type MessageContent = string | Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>;
    let content: MessageContent;
    if (imageBase64) {
        // 图生视频
        content = [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageBase64 } },
        ];
    } else {
        // 文生视频
        content = prompt;
    }

    const requestBody = {
        model,
        messages: [{ role: 'user', content }],
        stream: true,
    };

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error(`API错误: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error('无法读取响应流');
    }

    const decoder = new TextDecoder();
    let videoUrl = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();
                if (data === '[DONE]') continue;

                try {
                    const parsed = JSON.parse(data);

                    // 检查错误
                    if (parsed.error) {
                        throw new Error(parsed.error.message || '生成失败');
                    }

                    // 解析进度
                    if (parsed.choices?.[0]?.delta?.reasoning_content) {
                        const progressText = parsed.choices[0].delta.reasoning_content;
                        const match = progressText.match(/(\d+)%/);
                        if (match && onProgress) {
                            onProgress(parseInt(match[1]));
                        }
                    }

                    // 解析视频URL
                    if (parsed.choices?.[0]?.delta?.content) {
                        const content = parsed.choices[0].delta.content;
                        // 从 HTML 中提取视频 URL
                        const urlMatch = content.match(/src=['"]([^'"]+)['"]/);
                        if (urlMatch) {
                            videoUrl = urlMatch[1];
                        }
                    }
                } catch {
                    // 忽略解析错误
                }
            }
        }
    }

    if (!videoUrl) {
        throw new Error('未能获取视频URL');
    }

    return videoUrl;
}
