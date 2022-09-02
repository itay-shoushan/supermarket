export function parseTokenData() {
    const loginToken = localStorage.getItem("token") || '';
    if (loginToken === '') return
    const _extractedToken = loginToken.split('.')[1];
    const _atobData = atob(_extractedToken);
    const _finalData = JSON.parse(_atobData);
    return _finalData?.data
}