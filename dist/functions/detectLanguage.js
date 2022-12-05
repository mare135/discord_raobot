import fetch from 'node-fetch';
const { PAPAGO_CLIENT_ID, PAPAGO_CLIENT_SECRET } = process.env;
export const detectLanguage = async (content) => {
    const api_url = 'https://openapi.naver.com/v1/papago/detectLangs';
    const query = 'query=' + content;
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': ' application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': PAPAGO_CLIENT_ID,
            'X-Naver-Client-Secret': PAPAGO_CLIENT_SECRET,
        },
        body: query,
    };
    const response = await fetch(api_url, data);
    if (response.ok) {
        const json = (await response.json());
        return json.langCode;
    }
    else {
        return 'error';
    }
};
