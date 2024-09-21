const ToastMessage = ({messageData}) => {
    const { message, color } = messageData;

    return (
        <div className='overlay'>
            <div className='modal'>
                <p style={{ color: color }}>{message}</p>
            </div>
        </div>
    );
};

export default ToastMessage;