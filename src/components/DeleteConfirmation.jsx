import { handleDelete } from "./../utils/helpers";

const DeleteConfirmation = ({ itemName, item, setIsLoading, page, id, navigate, setShowConfirm }) => {
    const handleConfirm = () => {
        handleDelete(item, setIsLoading, page, id, navigate);
        setShowConfirm(false);
    }
    return (
        <div className='overlay'>
            <div className='modal'>
                <p>{`Are you sure you want to delete this ${itemName}?`}</p>
                <div className='modal-button-container'>
                    <button className="cancel-btn"
                        onClick={() => setShowConfirm(false)}>
                        Cancel
                    </button>
                    <button className="confirm-btn"
                        onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;