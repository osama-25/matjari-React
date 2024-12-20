// Listing.js
'use client';

import React, { useState, useEffect } from "react";
import { getInfo } from "../global_components/dataInfo";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ErrorPage from "../ErrorPage";
import CustomDetails from "../add_listing/CustomDetail";
import AddPhoto from "../add_listing/AddPhoto";

const EditListing = () => {
    const searchParams = useSearchParams();
    const itemID = searchParams.get('id'); console.log('hhhh' + itemID);
    const [photos, setPhotos] = useState([1, 2, 3]);
    const [customDetails, setCustomDetails] = useState([]);
    const [photoDataArray, setPhotoDataArray] = useState([]); // Track photo data as state
    const [photosURL, setPhotosURL] = useState([]); // Track URLs as state
    const [formData, setFormData] = useState({
        category: "",
        subCategory: "",
        title: "",
        description: "",
        condition: "",
        delivery: "",
        price: "",
        location: "",
        userID: ""
    });
    const t = useTranslations('Listing');
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [error, setError] = useState();
    const router = useRouter();

    const HandleLocaleChange = () => {
        const currentLocale = pathname.split("/")[1]; // Get the current locale (e.g., "en" or "ar")
        const newLocale = currentLocale === "en" ? "ar" : "en"; // Toggle the locale

        // Remove the current locale from the path and prepend the new locale
        const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
        router.push(`/${newLocale}${pathWithoutLocale}`);
    }

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await fetch(`http://localhost:8080/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchCat();
    }, []);

    useEffect(() => {
        const fetchSubCat = async () => {
            try {
                const response = await fetch(`http://localhost:8080/categories/${formData.category}`);
                const data = await response.json();
                setSubCategories(data || []);
            } catch (error) {
                setError(error.message);
            }
        }
        if (formData.category) {
            fetchSubCat();
        }
    }, [formData.category]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const info = await getInfo();
            if (info) {
                setFormData(prev => ({ ...prev, userID: info.id }));
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchItemInfo = async () => {
            try {
                console.log("item id: " + itemID);
                const response = await fetch(`http://localhost:8080/api/listing/${itemID}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch item: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setFormData(data);
            } catch (error) {
                //console.error("Error fetching item:", error);
                setError(error.message); // Set error state
            }
        };
        fetchItemInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const uploadPhotos = async () => {
        const uploadedUrls = [];

        for (const photo of photoDataArray) {
            try {
                const response = await fetch("http://localhost:8080/azure/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        filename: photo.filename,
                        fileType: photo.fileType,
                        imageBase64: photo.imageBase64,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error uploading photo: ${photo.filename}`);
                }

                const result = await response.json();
                if (result.imgURL) {
                    uploadedUrls.push(result.imgURL);
                } else {
                    throw new Error('No image URL received from server');
                }
            } catch (error) {
                console.error("Error uploading photo:", error);
                throw error; // Propagate error to handle it in the main submission
            }
        }

        return uploadedUrls;
    };
    const formCheck = () => {
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                throw new Error(`${key} is required`);
            }
        });
    }
    const removeEmptyDetails = () => {
        const filteredDetails = customDetails.filter(
            (detail) => detail.title.trim() !== "" && detail.description.trim() !== ""
        );
        setCustomDetails(filteredDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            removeEmptyDetails();
            formCheck();
            // First upload all photos and get their URLs
            const uploadedPhotoUrls = await uploadPhotos();

            if (uploadedPhotoUrls.length === 0) {
                throw new Error('No photos were successfully uploaded');
            }

            // Prepare the payload with the uploaded photo URLs
            const payload = {
                ...formData,
                photos: uploadedPhotoUrls,
                customDetails: customDetails.reduce((acc, detail) => ({
                    ...acc,
                    [detail.title]: detail.description
                }), {})
            };

            // Send the listing data to the backend
            const response = await fetch('http://localhost:8080/api/listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create listing: ${errorText}`);
            }

            const data = await response.json();
            console.log('Listing created successfully:', data);
            alert('Listing created successfully!');

            // Clear the form and photo data
            setPhotoDataArray([]);
            setPhotosURL([]);
            setPhotos([1, 2, 3]); // Reset to initial state
            setCustomDetails([]);
            setFormData({
                category: "",
                subCategory: "",
                title: "",
                description: "",
                condition: "",
                delivery: "",
                price: "",
                location: "",
                userID: formData.userID // Preserve the user ID
            });

        } catch (error) {
            //console.error('Error during submission:', error);
            alert(`Failed to create listing: ${error.message}`);
        }
    };

    const addPhoto = () => {
        if (photos.length < 12) setPhotos([...photos, photos.length + 1]);
    };

    const addPhotoURL = (filename, fileType, imageBase64) => {
        setPhotoDataArray(prev => [...prev, { filename, fileType, imageBase64 }]);
    };

    const deletePhotoURL = (id) => {
        setPhotoDataArray(prev => prev.filter((_, index) => index !== id));
    };

    if (error) {
        return <ErrorPage message={error} statusCode={404} />
    }

    return (
        <div className="flex justify-center items-center p-6 min-h-screen">
            <form
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg max-w-6xl p-6"
                onSubmit={handleSubmit}
            >
                <p onClick={HandleLocaleChange}
                    className={`absolute ${locale == 'ar' ? 'left-0' : 'right-0'} top-0 p-8 text-lg cursor-pointer`}>
                    {locale == 'ar' ? 'EN' : 'عربي'}
                </p>
                {/* Left Column */}
                <div className="space-y-2 p-4">
                    <h1 className="text-3xl font-bold mb-6">{t('addtitle')}</h1>
                    {/* Category Section */}
                    <div>
                        <label htmlFor="categories" className="block text-gray-700 text-lg font-bold">
                            {t('category')}
                        </label>
                        <select
                            id="categories"
                            name="category"
                            className="w-full mt-2 h-12 border-2 border-gray-300 text-gray-600 rounded-lg px-3 focus:outline-none"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">{t('categoryph')}</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {t(category.name)}
                                </option>
                            ))}
                        </select>
                        {/* Subcategory Section */}
                        <select
                            id="subcat"
                            name="subCategory"
                            className="w-full mt-2 h-12 border-2 border-gray-300 text-gray-600 rounded-lg px-3 focus:outline-none"
                            value={formData.subCategory}
                            onChange={handleInputChange}
                        >
                            <option value="">{t('subcatph')}</option>
                            {subcategories.map((subcategory, index) => (
                                <option key={index} value={subcategory.name}>
                                    {t(subcategory.name)}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Info Section */}
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-lg font-bold">
                                {t('title')}
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder={t('titleph')}
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full mt-2 h-12 border-2 border-gray-300 rounded-lg px-3 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="desc" className="block text-gray-700 text-lg font-bold">
                                {t('desc')}
                            </label>
                            <textarea
                                name="description"
                                placeholder={t('descph')}
                                id="desc"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full mt-2 py-2 h-24 border-2 border-gray-300 rounded-lg px-3 focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* Price Section */}
                    <div>
                        <label htmlFor="price" className="block text-gray-700 text-lg font-bold">
                            {t('price')}
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder={t('priceph')}
                            min={0}
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full mt-2 h-12 border-2 border-gray-300 rounded-lg px-3 focus:outline-none"
                        />
                    </div>
                    {/* Location Section */}
                    <div>
                        <label htmlFor="location" className="block text-gray-700 text-lg font-bold">
                            {t('location')}
                        </label>
                        <select
                            id="location"
                            name="location"
                            className="w-full mt-2 h-12 border-2 border-gray-300 text-gray-600 rounded-lg px-3 focus:outline-none"
                            value={formData.location}
                            onChange={handleInputChange}
                        >
                            <option value="">{t('locationph')}</option>
                            <option value="AM">{t('Amman')}</option>
                            <option value="IR">{t('Irbid')}</option>
                            <option value="AZ">{t('Az Zarqa')}</option>
                            <option value="AJ">{t('Ajlun')}</option>
                            <option value="TF">{t('Al Tafilah')}</option>
                            <option value="MF">{t('Al Mafraq')}</option>
                            <option value="MA">{t('Maan')}</option>
                            <option value="AQ">{t('Al Aqaba')}</option>
                            <option value="JR">{t('Jerash')}</option>
                            <option value="MD">{t('Madaba')}</option>
                            <option value="KR">{t('Al Karak')}</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="text-gray-700 text-lg font-bold">{t('details')}</label>
                        <div className="p-4">
                            <label className="text-gray-700 text-md font-bold">{t('condition')}</label>
                            <div className="flex gap-x-4">
                                <div className="m-2 flex items-center gap-x-2">
                                    <input
                                        type="radio"
                                        name="condition"
                                        id="new"
                                        value="New"
                                        checked={formData.condition === "New"}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    <label htmlFor='new' className="text-gray-700 text-md">{t('condition1')}</label>
                                </div>
                                <div className="m-2 flex items-center gap-x-2">
                                    <input
                                        type="radio"
                                        name="condition"
                                        id="used"
                                        value="Used"
                                        checked={formData.condition === "Used"}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    <label htmlFor='used' className="text-gray-700 text-md">{t('condition2')}</label>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <label className="text-gray-700 text-md font-bold">{t('delivery')}</label>
                            <div className="flex gap-x-4">
                                <div className="m-2 flex items-center gap-x-2">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        id="yes"
                                        value="Yes"
                                        checked={formData.delivery === "Yes"}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    <label htmlFor='yes' className="text-gray-700 text-md">{t('delivery1')}</label>
                                </div>
                                <div className="m-2 flex items-center gap-x-2">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        id="no"
                                        value="No"
                                        checked={formData.delivery === "No"}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    <label htmlFor='no' className="text-gray-700 text-md">{t('delivery2')}</label>
                                </div>
                            </div>
                        </div>
                        <CustomDetails customDetails={customDetails} setCustomDetails={setCustomDetails} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Photos Section */}
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 justify-items-center">
                            <div className="col-span-1 md:col-span-3 w-full">
                                <AddPhoto onDelete={deletePhotoURL} onUpload={addPhotoURL} size="large" />
                            </div>
                            {photos.map((photo, index) => (
                                <AddPhoto key={index} id={index} onDelete={deletePhotoURL} onUpload={addPhotoURL} size="small" />
                            ))}
                            {photos.length < 9 && (
                                <button
                                    type="button"
                                    onClick={addPhoto}
                                    className="w-24 h-24 md:w-26 md:h-26 lg:w-36 lg:h-36 bg-gray-200 flex items-center justify-center rounded-lg text-3xl shadow hover:bg-gray-300"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-3 px-6 rounded-lg focus:outline-none"
                    >
                        {t('submit')}
                    </button>
                </div>
            </form>
        </div >
    );
};

export default EditListing;
