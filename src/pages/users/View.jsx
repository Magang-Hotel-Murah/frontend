import React, { useState } from "react";
import { X, Save } from "lucide-react";
import axios from "axios";


const Create =  ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        "name": "",
        "email": "",
        "role": "",
        "password": "",
        "deleted_at": null,
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try{
            const response = await axios.post("http://127.0.0.1:8080/api/user", formData);
            onSuccess(response.data);
            onClose();
        } catch(error){
            console.log(error);
            alert("Gagal menambahkan user");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
            <div className="relative bg-white rounded-lg w-full max-w-md shadow-lg">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Tambah User Baru</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Nama"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    />
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    />
                    <select 
                        name="role" 
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <select 
                        name="status" 
                        value={formData.deleted_at}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="Active">Aktif</option>
                        <option value="Unactive">Non-Aktif</option>
                    </select>
                    <div className="flex justify-end gap-3 mt-6">
                        <button onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg">
                            Batal
                        </button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-primary-600 text-gray-100 rounded-lg flex items-center gap-2">
                            <Save className="w-4 h-4"/> Tambah
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;