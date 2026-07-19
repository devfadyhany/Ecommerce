import {Mail, Phone} from "lucide-react";
function ProfileInfo({onEdit, user}){

    
    return(
        <div className="bg-card p-4 space-y-4 rounded-2xl shadow-md max-w-6xl mx-auto p-4 space-y-6 ">
            <div className="p-header flex justify-start items-center gap-3">
                <img className="size-20 rounded-full" src= {user.avatar} alt="profile" />
                <div className="user-info">
                    <h3 className="text-xl font-bold text-ink">{user.username}</h3>
                    <p className="text-md font-thin text-ink-soft">{user.email}</p>
                    <p className="text-md font-thin text-gold">{user.role}</p>
                </div>
            </div>
            <div className="contact-info">
                <div className="flex items-center gap-2">
                    <Mail className="text-gold" size={18}/>
                    <p className="text-md font-thin text-ink-soft">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="text-gold" size={18}/>
                    <p className="text-md font-thin text-ink-soft">{user.phone}</p>
                </div>
            </div>
            <button onClick={onEdit}  className="px-4 py-2 rounded-md bg-gradient-to-r from-gold-deep to-gold text-on-gold hover:shadow-lg transition">Edit Profile</button>
        </div>
    )
}
export default ProfileInfo;