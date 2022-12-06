import React from 'react'


function Meme() {
    const [meme, setMeme] = React.useState({
        tepText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    const [allMemesImage, setAllMemeImage] = React.useState([])  


    React.useEffect(() => {
        fetch(`https://api.imgflip.com/get_memes`)
            .then(res => res.json())
            .then(data => setAllMemeImage(data.data.memes))
    
    }, [])

    function getMemeImg() {
        const randomNumber = Math.floor(Math.random() * allMemesImage.length)
        const url = allMemesImage[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    return (
        <main>
            <div className='form'>
                <input
                    type="text"
                    className='form--input'
                    placeholder='Top text'
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className='form--input'
                    placeholder='Bottom text'
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    onClick={getMemeImg}
                    className='form--button'
                >
                    Get a new meme image  🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
export default Meme