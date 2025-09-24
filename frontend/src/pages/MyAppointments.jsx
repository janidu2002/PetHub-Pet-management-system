import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import api from '../services/api';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments/my-appointments');
            if (data.success) {
                setAppointments(data.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
                
                <div className="space-y-4">
                    {appointments.map(appointment => (
                        <div key={appointment._id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{appointment.petName} - {appointment.serviceType}</h3>
                                    <p className="text-gray-600 flex items-center">
                                        <Calendar className="mr-1" size={16} />
                                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 flex items-center">
                                        <Clock className="mr-1" size={16} />
                                        {appointment.appointmentTime}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                    appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {appointment.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyAppointments;