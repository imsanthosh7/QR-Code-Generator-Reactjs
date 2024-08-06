import React, { useState } from 'react'


function Qrcodegenerator() {

    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState('');
    const [qrsize, setqrSize] = useState('150');
    const [isDataVaild, setIsdatavalid] = useState(true);
    const [isQrSizeVaild, setQrSizevalid] = useState(true);

    async function generate() {

        const dataValid = data.trim() !== '';
        console.log(dataValid);


        const sizeValid = qrsize.trim() !== '' && !isNaN(qrsize) && Number(qrsize) > 0;

        setIsdatavalid(dataValid);
        setQrSizevalid(sizeValid);


        setLoading(true);

        try {

            const URL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(data)}`
            setImg(URL)

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false)
        }

    }

    function downlodQrcode() {
        fetch(img)
            .then((response) => response.blob())
            .then((result) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(result);
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            ).catch((error) => {
                console.error('Error downloading Qr code', error)
            })

    }


    return (
        <div className='flex justify-center items-center w-full h-svh  bg-gray-950'>
            <div className='flex justify-center flex-col items-center bg-white w-auto h-auto py-6 px-5 rounded-lg'>
                <h1 className='text-2xl font-bold text-blue-600'>Qrcode Generator</h1>
                {loading && <p className='mt-3'>Please Wite...</p>}

                {img && <img src={img} className='w-32 mt-3 border-2 border-black rounded-sm p-1 ' alt="" />}

                <div className='flex justify-center items-start flex-col  mt-5 '>
                    <label className='input-lable' htmlFor="datainput">Data for QR code:</label>
                    <input className={`w-full mt-3 border-2 p-1 rounded-md ${isDataVaild ? 'border-blue-500' : 'border-red-500 '} outline-none mb-3`}
                        type="text"
                        value={data}
                        onChange={(e) => setdata(e.target.value)}
                        id='dataInput'
                        placeholder='Enter data for Qr code' />

                    <label htmlFor="sizeInput">Image size(ex:150):</label>
                    <input className={`w-full mt-3 border-2 p-1 rounded-md ${isQrSizeVaild ? 'border-blue-500' : 'border-red-500 '} outline-none mb-3`}
                        type="text"
                        id='sizeInput'
                        value={qrsize}
                        onChange={(e) => setqrSize(e.target.value)}
                        placeholder='Enter the size' />
                    <div className='flex flex-row'>
                        <button className='border-2 p-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 duration-100 outline-none'
                            onClick={generate}
                            disabled={loading} >
                            Generate Qr code
                        </button>
                        <button className='border-2 p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-600 duration-100 outline-none'
                            onClick={downlodQrcode}>
                            Download Qr Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Qrcodegenerator