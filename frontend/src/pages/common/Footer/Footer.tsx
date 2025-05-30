export default function Footer(){
    return(
        <div className="w-full bg-black text-white pt-10 pb-10">
            <div className="aspiro-container">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="details">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-briefcase !text-2xl"></i>
                            <p className="text-3xl">Aspiro</p>
                        </div>
                        <div className="text-sm mt-5">
                            <p className="text-gray-400">Call now : <span className="text-white">(333) 555-1155</span></p>
                            <p className="mt-3 text-xs text-gray-400">Building No.331, New Bus Terminal, Tavakara <br /> 
                            Kannur, Kerala, India</p>
                        </div>
                    </div>
                    <div className="links grid grid-cols-4 gap-10">
                        <div className="col">
                            <p className="title">Quick links</p>
                            <ul className="mt-4">
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">About</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Contact</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Pricing</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Feedback</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="title">Candidate</p>
                            <ul className="mt-4">
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Browse Jobs</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Browse Employers</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Candidate Dashboard</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Saved Jobs</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="title">Employers</p>
                            <ul className="mt-4">
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Post Job</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Browse Candidates</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Employers Dashboard</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Applications</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="title">Support</p>
                            <ul className="mt-4">
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Faq</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Privacy Policy</li>
                                <li className="font-thin text-sm mt-2 hover:font-semibold group">Terms & Conditions</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright-info border-t mt-10 py-5 flex justify-between">
                    <p className="text-xs text-gray-400">&copy; 2025 Aspiro - All rights reserved | Developed & Managed by mXplora</p>
                    <div className="flex justify-between gap-5">
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin"></i>

                    </div>
                </div>
            </div>
        </div>
    )
}