function formatDate(dateStr:string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' ', ' ').replace(/(\d{2} \w{3})/, '$1,');
}


export {
    formatDate
}