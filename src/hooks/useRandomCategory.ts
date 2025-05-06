import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLazyGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { Recipe } from '~/types/apiTypes';

const useRandomCategory = (activeCategoryId: string | null) => {
    const categories = useSelector((state: ApplicationState) => state.categories.categories);
    const subCategories = useSelector((state: ApplicationState) => state.categories.subCategories);

    const [randomTitle, setRandomTitle] = useState('');
    const [randomDescription, setRandomDescription] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [trigger] = useLazyGetRecipesByCategoryQuery();

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!categories.length || !subCategories.length) return;

            const otherCategories = categories.filter((cat) => cat._id !== activeCategoryId);
            if (!otherCategories.length) return;

            const randomCategory =
                otherCategories[Math.floor(Math.random() * otherCategories.length)];
            const subcats = subCategories.filter(
                (sub) => sub.rootCategoryId === randomCategory._id,
            );
            if (!subcats.length) return;

            setRandomTitle(randomCategory.title);
            setRandomDescription(randomCategory.description);

            trigger({ id: subcats[0]._id });

            const collected: Recipe[] = [];
            const seen = new Set<string>();

            for (const sub of subcats) {
                const { data } = await trigger({ id: sub._id, limit: 5 }).unwrap();
                for (const recipe of data || []) {
                    if (!seen.has(recipe._id)) {
                        seen.add(recipe._id);
                        collected.push(recipe);
                    }
                    if (collected.length >= 5) break;
                }
                if (collected.length >= 5) break;
            }

            setRecipes(collected);
        };

        fetchRecipes();
    }, [activeCategoryId, categories, subCategories, trigger]);

    return { randomRecipes: recipes, randomTitle, randomDescription };
};

export default useRandomCategory;
