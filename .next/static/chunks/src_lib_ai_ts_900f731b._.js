(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/ai.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "sendMessageToLLM": (()=>sendMessageToLLM)
});
async function sendMessageToLLM(messages, apiKey) {
    try {
        // Convert our message format to OpenRouter format
        const openRouterMessages = messages.map((msg)=>({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'AI Assistant App'
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses to user questions.'
                    },
                    ...openRouterMessages
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from API');
        }
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI API Error:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to get AI response');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_lib_ai_ts_900f731b._.js.map