import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import logo from '../../assets/icon.png';
import { toast } from 'react-toastify';

const VerifyOtp: React.FC = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone;

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://api.discoun3ree.com/api/users/verify-otp', { phone, otp });
            setErrors(null);
            setLoading(false);
            toast("You account is now activated.")
            navigate('/accounts/sign-in');
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data.message || 'An error occurred');
            } else {
                setErrors('An error occurred');
            }
        }
    };

    return (
        <div className="flex flex border bg-gray-100 items-center justify-center min-h-screen">
            <div className="w-fit bg-white h-fit rounded-md flex flex-col md:flex-row">
                <div className="bg-white p-8 rounded-lg w-full md:w-1/2 ">
                    <div className="text-center mb-2">
                        <a href="/">
                            <img src={logo} className='w-[50px] -mb-4 mx-auto' alt="Logo" />
                        </a>
                        <h1 className="text-2xl font-semibold text-black">Verify OTP</h1>
                    </div>
                    <form onSubmit={handleVerifyOtp} className="">
                        {errors && <p className="text-sm text-red-500 mb-4">{errors}</p>}
                        <div className="mb-1">
                            <label htmlFor="otp" className="block text-[14px] text-black">OTP <span className='text-primary '>*</span></label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={otp}
                                placeholder='Enter OTP'
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 p-2 text-[13px] block w-full rounded border border-gray-300 focus:border-primary outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-2 mt-4 rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
                        >
                            {loading ? <ClipLoader color={"#fff"} size={20} /> : 'Verify'}
                        </button>
                    </form>
                </div>
                <div className="hidden md:flex justify-center items-center ">
                    <img src="https://imgs.search.brave.com/VikpyiN7OTH_xj6mfR6zYxy8_mHlGuCGveLv7wIAg14/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzUzLzMyLzc2/LzM2MF9GXzQ1MzMy/NzYyMF9mbExTaFJD/VU50cW9WTUszTnlm/SmRLSTFVblEzRHhC/eS5qcGc" alt="Illustration" />
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
