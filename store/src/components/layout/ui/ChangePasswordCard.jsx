import {LockKeyhole} from "lucide-react";

function ChangePasswordCard(){
    return(
    <div>
        <div className="bg-card p-4 space-y-4 rounded-2xl shadow-md max-w-6xl mx-auto p-4 space-y-6 ">
            <div className="title flex gap-3 justify-start items-center">
                <LockKeyhole className="text-gold"/>
                <h2 className="text-2xl font-bold text-ink">Change Password</h2>
            </div>
            <button className="px-4 py-2 rounded-md border border-gold text-gold hover:shadow-lg transition">Change Password</button>
        </div>
    </div>
    )
}
export default ChangePasswordCard;