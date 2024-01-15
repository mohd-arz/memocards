/* eslint-disable react/prop-types */
function Card({src,handleClick}){

  
    return (
      <div className="card-container">
          <img src={src} className='card' onClick={handleClick}/>
          <img src="https://deckofcardsapi.com/static/img/back.png" alt="" className='card-back'/>
      </div>
    )
  }

export default Card;