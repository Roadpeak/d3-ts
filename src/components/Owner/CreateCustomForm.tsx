import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SellerLayout from '../../elements/SellerLayout';
import { getCookie } from '../../utils/cookiUtils';

interface Field {
    name: string;
    type: string;
    required: boolean;
}

interface CustomForm {
    shop_id: number;
    name: string;
    fields: Field[];
    recurrence_type: string;
    start_date: string;
    end_date?: string;
    recurrence_details?: string[];
    description?: string;
    max_appointments?: number;
    appointment_duration?: number;
    recurrence_limit?: string[];
}

const CreateCustomForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<CustomForm>({
        shop_id: Number(id),
        name: '',
        fields: [],
        recurrence_type: 'one-time',
        start_date: '',
        end_date: '',
        description: '',
        max_appointments: 0,
        appointment_duration: 0,
        recurrence_limit: []
    });
    const [newField, setNewField] = useState<Field>({ name: '', type: 'text', required: false });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewField({ ...newField, [name]: value });
    };

    const handleFieldRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewField({ ...newField, required: e.target.checked });
    };

    const addField = () => {
        setForm({ ...form, fields: [...form.fields, newField] });
        setNewField({ name: '', type: 'text', required: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = getCookie('access_token'); ;
            const response = await axios.post('https://api.discoun3ree.com/api/custom-forms', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Form created successfully:', response.data);
        } catch (error) {
            console.error('Error creating form:', error);
        }
    };

    return (
        <SellerLayout>
            <div className="w-full flex flex-col bg-white h-full overflow-y-auto rounded-md p-4 ">
                <h1 className="text-2xl font-bold mb-4">Create Your Custom appointment</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-[14px] font-medium mb-1">Name / Title</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                            placeholder='What are you creating this for?'
                            className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-[14px] font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            placeholder='Tell your responders more about this.'
                            className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-[14px] font-medium mb-1">Recurrence Type</label>
                        <select
                            name="recurrence_type"
                            value={form.recurrence_type}
                            onChange={handleInputChange}
                            required
                            className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                        >
                            <option value="one-time">One-Time</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row items-center w-full">
                        <div className='w-full'>
                            <label className="block text-gray-600 text-[14px] font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={form.start_date}
                                onChange={handleInputChange}
                                required
                                className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="block text-gray-600 text-[14px] font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={form.end_date || ''}
                                onChange={handleInputChange}
                                className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Fields</h2>
                        <p className="text-gray-500 font-light text-[13px]">Here, you design what info to get from your responders.</p>
                        {form.fields.map((field, index) => (
                            <div key={index} className="flex items-center space-x-2 mt-2">
                                <p className="flex-1">{field.name} ({field.type}) - {field.required ? 'Required' : 'Optional'}</p>
                            </div>
                        ))}
                        <div className="flex flex-col items-center space-x-2 mt-4">
                            <div className="flex flex-col w-full">
                                <label className='block text-gray-600 text-[14px] font-medium mb-1' htmlFor="name">Field Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Field Name"
                                    value={newField.name}
                                    onChange={handleFieldChange}
                                    className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                                />
                            </div>
                            <div className="flex w-full flex-col">
                                <label className='block text-gray-600 text-[14px] font-medium mb-1' htmlFor="type">Input type</label>
                                <select
                                    name="type"
                                    value={newField.type}
                                    onChange={handleFieldChange}
                                    className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                                >
                                    <option value="text">Text</option>
                                    <option value="number">Number</option>
                                    <option value="date">Date</option>
                                    <option value="time">Time</option>
                                    <option value="email">Email</option>
                                    <option value="textarea">Textarea</option>
                                </select>
                            </div>
                            <span className="flex w-full gap-2">
                                <div className="flex flex-col w-full">
                                    <label className='block text-gray-600 text-[14px] font-medium mb-1' htmlFor="required">Required</label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="required"
                                            checked={newField.required}
                                            onChange={handleFieldRequiredChange}
                                            className="h-4 w-4 text-primary border-gray-300 "
                                        />
                                        <span className="text-sm">Required</span>
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={addField}
                                    className="bg-primary w-full text-white px-4 py-2 rounded"
                                >
                                    Add Field
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full items-center gap-4">
                        <div className='w-full'>
                            <label className="block text-gray-600 text-[14px] font-medium mb-1">Max Appointments</label>
                            <input
                                type="number"
                                name="max_appointments"
                                value={form.max_appointments || ''}
                                onChange={handleInputChange}
                                placeholder='Maximum number of responses you expect.'
                                className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="block text-gray-600 text-[14px] font-medium mb-1">Appointment Duration (minutes)</label>
                            <input
                                type="number"
                                name="appointment_duration"
                                value={form.appointment_duration || ''}
                                onChange={handleInputChange}
                                placeholder='How long does a single session last?'
                                className="w-full flex bg-gray-50 border border-gray-100 focus:border-primary outline-none py-2 px-4 rounded-md text-gray-600 text-[14px]"
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            Create Form
                        </button>
                    </div>
                </form>
            </div>
        </SellerLayout>
    );
};

export default CreateCustomForm;
