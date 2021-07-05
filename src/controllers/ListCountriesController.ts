interface CountryList {
    name: string;
    area: number;
    region:string;
    population:number;
}


export const getAveragePopulation = (data:any):number => {
    const pouplation = data.map((item: any) => {
        if (!isNaN(item.population)) {
            return item.population;
        } else {
            return 0;
        }
    });
    const totalPopulation = pouplation.reduce((a: any, b: any) => {
        return a + b;
    }, 0);
    const averagePopulation = totalPopulation / data.length;
    //29396548.924
    return averagePopulation
}

export const getLargestAndSmallest = (data:any) => {
    data.sort(function (a: any, b: any) {
        return a['area'] - b['area'];
    });
    
    const filterCopyRes = data.filter((country:CountryList) => {
        return country.area !== null;
    });
    const largest = filterCopyRes[filterCopyRes.length - 1];
    const smallest = filterCopyRes[0];

    return {largest, smallest};
}

export const sortByString = (data:any, sortBy:string, sortName:boolean) => {
    data.sort(function (a:any, b:any) {
        var nameA = a[sortBy];
        var nameB = b[sortBy];
        return sortName ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
    return data;
}

export const sortByNumber = (data:any, sortBy:string, sortName:boolean) => {
    data.sort(function (a:any, b:any) {
        return sortName ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    });
    return data;
}