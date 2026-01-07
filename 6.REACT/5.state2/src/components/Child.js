function Child({onSend}) {
    return(
        <div>
            <h3>자식</h3>
            <button onClick={() => onSend('안녕하세요 부모님~')}>부모에게 메시지 보내기</button>
        </div>
    );
}

export default Child;