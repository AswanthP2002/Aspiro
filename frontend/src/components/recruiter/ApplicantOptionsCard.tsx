export default function ApplicantCardOptions({reject, removeFromShortlist, flag, buttonOptions, showCard, selectMethod, addToShortListMethod, rejectMethod }: any) {
    return (
        <>
            {
                showCard && (
                    <div className="card bg-white shadow rounded p-3 absolute right-3">
                        <ul className="grid grid-cols-1 gap-3">
                            {
                                flag === 'applicationList' && (
                                    <>
                                        <li onClick={addToShortListMethod} className="text-xs cursor-pointer">Add to shortlist</li>
                                        <li onClick={selectMethod} className="text-xs cursor-pointer">Select tile</li>
                                        <li onClick={reject} className="text-xs cursor-pointer">Reject application</li>
                                    </>
                                )
                            }

                            {
                                flag  === 'shortList' && (
                                    <>
                                        <li onClick={removeFromShortlist} className="text-xs cursor-pointer">Remove</li>
                                        <li onClick={selectMethod} className="text-xs cursor-pointer">Interview email</li>
                                        <li onClick={rejectMethod} className="text-xs cursor-pointer">Reject application</li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </div>
                )
            }
        </>
    )
}