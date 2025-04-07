import categories from '~/data/categories';

export const getTitleByUrl = (url: string | null) => {
    const categoriesBread = categories.map((item) => ({ title: item.title, url: item.url }));
    const newUrls = [{ title: 'Самое сочное', url: '/juicy' }];
    const breads = [...categoriesBread, ...newUrls];
    const bread = breads.find((b) => b.url === `/${url}`);
    return bread ? bread.title : url;
};
