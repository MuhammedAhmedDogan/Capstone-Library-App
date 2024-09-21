import { getList, getById, addData, updateData, deleteData } from './../services/api_service';

export const handleTurnBack = (navigate, page) => {
    navigate(`/${page}`);
};

export const goToEditPage = (id, page, navigate) => {
    navigate(`/${page}/${id}`);
};

export const handleInput = (e, setItemState) => {
    const { id, value } = e.target;
    const key = id.split('-')[1];

    setItemState(prevState => ({
        ...prevState,
        [key]: value
    }));
};

export const handleSave = async (item, setIsLoading, page, id, navigate) => {
    if (item.name.trim() !== '') {
        try {
            setIsLoading(true);
            if (item.id === 0) {
                await addData(page, item);
            } else {
                await updateData(page, id, item);
            }
            setIsLoading(false);
            navigate(`/${page}`);
        } catch (error) {
            navigate(`/${page}`);
        }
    } else {
        console.log('name alanı boş olamaz') // alert verilecek
    }

};

export const handleDelete = async (item, setIsLoading, page, id, navigate) => { // onay istenecek
    try {
        setIsLoading(true);
        if (item.id !== 0) {
            await deleteData(page, id);
        }
        setIsLoading(false);
        navigate(`/${page}`);
    } catch (error) {
        navigate(`/${page}`);
    }
};

export const fetchDataItem = async (setItemState, setIsLoading, page, id, navigate) => {
    if (id === '0') {
        setIsLoading(false);
    } else {
        try {
            const item = await getById(page, id);
            setItemState(item);
            setIsLoading(false);
        } catch (error) {
            navigate(`/${page}`);
        }
    }
};

export const fetchDataList = async (setListState, setIsLoading, page, navigate) => {
    try {
        const ListData = await getList(page);
        ListData.sort((a, b) => a.id - b.id);
        setListState(ListData);
        setIsLoading(false);
    } catch (error) {
        console.error("Error processing data:", error);
        setTimeout(() => {
            navigate(page)
        }, 3000);
    }
};