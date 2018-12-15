const _ = {
    getCookie (name) {
        let res = null;
        document.cookie.split(';').forEach(item => {
            let itemArr = item.split('=');
            if (itemArr[0].trim() === name.trim()) {
                res = itemArr[1];
            };
        });
    
        return res;
    }
};

export default _;