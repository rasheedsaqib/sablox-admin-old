export const getDailyData = datalist => {
    return datalist.filter(data => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return new Date(Math.floor(new Date(data.createdAt).getTime())) > date;
    });
};

export const getWeeklyData = datalist => {
    return datalist.filter(data => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return new Date(Math.floor(new Date(data.createdAt).getTime())) > date;
    });
};

export const getMonthlyData = datalist => {
    return datalist.filter(data => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return new Date(Math.floor(new Date(data.createdAt).getTime())) > date;
    });
};

export const getYearlyData = datalist => {
    return datalist.filter(data => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        return date < new Date(Math.floor(new Date(data.createdAt).getTime()));
    });
};

export const getMonthlyArray = datalist => {
    let result = [];
    for (let i = 1; i < 31; i++) {
        result[i] = getDataInCertainDate(datalist, 31-i, 30-i).length;
    }
    return result.slice(1,31);
}

const getDataInCertainDate = (datalist, start, end) => {
    return datalist.filter(data => {
        const date1 = new Date();
        const date2 = new Date();
        date1.setDate(date1.getDate() - start);
        date2.setDate(date2.getDate() - end);
        return date1 < new Date(Math.floor(new Date(data.createdAt).getTime())) && new Date(Math.floor(new Date(data.createdAt).getTime())) < date2;
    })
}