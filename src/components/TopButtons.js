const TopButtons = ({ changeUi, currentUI }) => {

    return (
        <div className="ui-buttons">
            { currentUI==="Saldo" 
            ? <button id="btn-saldo" className="selected-ui" onClick={changeUi}>Saldo</button>
            : <button id="btn-saldo"  onClick={changeUi}>Saldo</button>}
            { currentUI==="Laskenta" 
            ? <button id="btn-laskenta" className="selected-ui" onClick={changeUi}>Laskenta</button>
            : <button id="btn-laskenta"  onClick={changeUi}>Laskenta</button>}
            { currentUI==="Hallinta" 
            ? <button id="btn-hallinta" className="selected-ui" onClick={changeUi}>Hallinta</button>
            : <button id="btn-hallinta"  onClick={changeUi}>Hallinta</button>}
        </div>
    )

}


export default TopButtons;