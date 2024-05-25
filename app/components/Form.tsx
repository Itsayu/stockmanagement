"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  category: string;
  artNo: string;
  fabric: string;
  size: string;
  color: string;
  description: string;
  rate: string;
  image: File | null;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    artNo: "",
    fabric: "",
    size: "",
    color: "",
    description: "",
    rate: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      image: file,
    });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('category', formData.category);
    formDataToSend.append('artNo', formData.artNo);
    formDataToSend.append('fabric', formData.fabric);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('rate', formData.rate);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        // Clear the form fields
        setFormData({
          category: '',
          artNo: '',
          fabric: '',
          size: '',
          color: '',
          description: '',
          rate: '',
          image: null,
        });
        setImagePreview(null);
        setSuccessMessage(data.message);
      } else {
        console.error('Error submitting form:', data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen bg-[#601c1a]"
    >
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row w-full h-full max-w-6xl p-10">
        <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">
                Category:
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">
                Art No:
              </label>
              <input
                type="text"
                name="artNo"
                value={formData.artNo}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">
                Fabric:
              </label>
              <input
                type="text"
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">Size:</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              ></textarea>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-[25px] text-[#ffbd59]">Rate:</label>
              <input
                type="text"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
                className="w-3/4 mt-1 block border border-gray-300 rounded-3xl shadow-sm p-2"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <label className="block text-[25px] text-[#ffbd59] mb-2">
              Upload Image:
            </label>
            <label
              htmlFor="fileInput"
              className="px-8 py-2 block text-gray-900 border border-gray-300 rounded-3xl cursor-pointer bg-gray-50"
            >
              Upload File
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="hidden"
            />
            {!imagePreview ? (
              <div className="mt-4 w-64 h-64 flex items-center justify-center border-2 border-white rounded-md bg-white">
                No Image Uploaded
              </div>
            ) : (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 w-64 h-64 object-cover rounded-md"
              />
            )}
          </div>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="text-green-500 text-center mt-4">{successMessage}</div>
      )}
      <div className="w-full flex justify-center mt-6">
        <button
          type="submit"
          className="px-10 bg-[#da6f48] text-black py-2 rounded-3xl shadow-sm hover:bg-[#a95637]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;