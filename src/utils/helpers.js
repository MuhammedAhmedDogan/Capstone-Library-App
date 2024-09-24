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

export const handleSelect = (e, setItemState, objList) => {
    const { id, value } = e.target;
    const key = id.split('-')[1];
    const selectedObjId = parseInt(value);
    const selectedObj = objList.find(item => item.id === selectedObjId);
    setItemState(prevState => ({
        ...prevState,
        [key]: selectedObj
    }));
};

export const handleSave = async (itemName, item, setIsLoading, page, id, navigate, setShowMessage, setMessageData) => {
    try {
        setIsLoading(true);
        if (item.id === 0) {
            await addData(page, item);
            setMessageData({ message: `${itemName} added successfully!`, color: '#32CD32' });
        } else {
            await updateData(page, id, item);
            setMessageData({ message: `${itemName} updated successfully!`, color: '#32CD32' });
        }
        setIsLoading(false);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            navigate(`/${page}`);
        }, 2000);

    } catch (error) {
        setMessageData({ message: `${itemName} save operation failed!`, color: '#FF2400' });
        setIsLoading(false);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            navigate(`/${page}`);
        }, 2000);
    }
};

export const handleDelete = async (itemName, item, setIsLoading, page, id, navigate, setShowMessage, setMessageData) => {
    try {
        setIsLoading(true);
        if (item.id !== 0) {
            await deleteData(page, id);
            setMessageData({ message: `${itemName} deleted successfully!`, color: '#32CD32' });
            setIsLoading(false);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                navigate(`/${page}`);
            }, 2000);
        } else {
            setIsLoading(false);
            navigate(`/${page}`);
        }
    } catch (error) {
        setMessageData({ message: `${itemName} delete operation failed!`, color: '#FF2400' });
        setIsLoading(false);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            navigate(`/${page}`);
        }, 2000);
    }
};

export const fetchDataItem = async (setItemState, setIsLoading, page, id, navigate) => {
    setIsLoading(true);
    if (id === '0') {
        setIsLoading(false);
    } else {
        try {
            const item = await getById(page, id);
            setItemState(item);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            navigate(`/${page}`);
        }
    }
};

export const fetchDataList = async (setListState, setIsLoading, page, navigate) => {
    setIsLoading(true);
    try {
        const ListData = await getList(page);
        ListData.sort((a, b) => a.id - b.id);
        setListState(ListData);
        setIsLoading(false);
    } catch (error) {
        console.log(error);
        navigate('/');
    }
};