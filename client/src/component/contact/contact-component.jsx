import toast from "react-hot-toast";
import ContactStore from "../../store/contact-store.js";
import {isEmpty} from "../../utility/ValidationHelper.js";
import {useState} from "react";
import LoadingSkeleton from "../../skeleton/Loading-skeleton.jsx";



const ContactComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const {ContactFormData,ContactFormOnChange,ContactCreateRequest}=ContactStore()



    const SubmitButton=async ()=>{
        let {fullName, email, subject, msg} =ContactFormData
        setLoading('d-block')

        let res = await ContactCreateRequest(ContactFormData)
        if(!fullName || !email || !subject || !msg){
            setLoading('d-none')
            toast.error('all fields required');
        }
        else if(res){
            setLoading('d-none')
            toast.success("Successfully submit");
        }
        else {
            setLoading('d-none')
            toast.error("Submission failed. Please try again.");
        }
    }
    return (
        <>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container my-4">
                <form className="col-lg-6 col-md-8 mx-auto p-4 rounded shadow  bg-white">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-2">
                            <input className="form-control" type="text" placeholder="Full Name"
                                   required
                                    defaultValue={ContactFormData.fullName}
                                    onChange={(e) => {ContactFormOnChange('fullName', e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-2">
                            <input className="form-control" type="text" placeholder="Email Address"
                                   defaultValue={ContactFormData.email}
                                   onChange={(e) => {ContactFormOnChange('email', e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <input className="form-control" type="text" placeholder="Subject"
                               defaultValue={ContactFormData.subject}
                               onChange={(e) => {ContactFormOnChange('subject', e.target.value)}}
                        />
                    </div>
                    <div className="my-3">
                        <textarea className="form-control" rows="4" placeholder="Enter your message"
                                  defaultValue={ContactFormData.msg}
                                  onChange={(e) => {ContactFormOnChange('msg', e.target.value)}}
                        ></textarea>
                    </div>
                    <div className="">
                        <button onClick={SubmitButton} type={"button"} className="btn btn-info px-5">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactComponent;