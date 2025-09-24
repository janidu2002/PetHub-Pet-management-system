import React, { useState, useEffect } from 'react';
import { Calendar, Clock, PawPrint } from 'lucide-react';
import api from '../services/api';

const AppointmentBooking = () => {
    const [formData, setFormData] = useState({
        petName: '',
        petType: '',
        serviceType: '',
        appointmentDate: '',
        appointmentTime: '',
        veterinarian: '',
        notes: ''
    });

    const [doctors, setDoctors] = useState([]);
    const serviceTypes = ['Vaccination', 'Grooming', 'Checkup', 'Surgery', 'Dental'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const { data } = await api.get('/doctors');
                if (data.success) setDoctors(data.data);
            } catch (e) {
                console.error('Failed to load doctors', e);
            }
        }
        loadDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', formData);
            alert('Appointment booked successfully!');
            setFormData({
                petName: '', petType: '', serviceType: '', 
                appointmentDate: '', appointmentTime: '', 
                veterinarian: '', notes: ''
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert(error.response?.data?.message || 'Failed to book appointment');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <PawPrint className="mr-2" /> Book Appointment
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Pet Name</label>
                            <input type="text" required 
                                value={formData.petName}
                                onChange={(e) => setFormData({...formData, petName: e.target.value})}
                                className="w-full p-2 border rounded" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium">Pet Type</label>
                            <input type="text" required 
                                value={formData.petType}
                                onChange={(e) => setFormData({...formData, petType: e.target.value})}
                                className="w-full p-2 border rounded" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Service Type</label>
                        <select required 
                            value={formData.serviceType}
                            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                            className="w-full p-2 border rounded">
                            <option value="">Select Service</option>
                            {serviceTypes.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium flex items-center">
                                <Calendar className="mr-1" size={16} /> Date
                            </label>
                            <input type="date" required 
                                value={formData.appointmentDate}
                                onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                                className="w-full p-2 border rounded" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium flex items-center">
                                <Clock className="mr-1" size={16} /> Time
                            </label>
                            <select required 
                                value={formData.appointmentTime}
                                onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                                className="w-full p-2 border rounded">
                                <option value="">Select Time</option>
                                {timeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Veterinarian</label>
                        <select required 
                            value={formData.veterinarian}
                            onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
                            className="w-full p-2 border rounded">
                            <option value="">Select Doctor</option>
                            {doctors.map(d => (
                                <option key={d._id} value={d.name}>{d.name} {d.title ? `- ${d.title}` : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Notes</label>
                        <textarea 
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="w-full p-2 border rounded" rows="3" />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentBooking;