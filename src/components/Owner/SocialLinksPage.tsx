import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faFacebook,
    faYoutube,
    faTwitter,
    faLinkedin,
    faPinterest,
    faTiktok,
    faSnapchat,
    faReddit,
    faGithub,
    IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import SellerLayout from '../../elements/SellerLayout';
import { MdOutlineDelete } from 'react-icons/md';
import { IoAddSharp } from 'react-icons/io5';
import { DeleteSocialLinkResponse, SocialLink } from '../../types';

const getIcon = (url: string): IconDefinition | null => {
    if (url.includes('instagram.com')) return faInstagram;
    if (url.includes('facebook.com')) return faFacebook;
    if (url.includes('youtube.com')) return faYoutube;
    if (url.includes('twitter.com')) return faTwitter;
    if (url.includes('linkedin.com')) return faLinkedin;
    if (url.includes('pinterest.com')) return faPinterest;
    if (url.includes('tiktok.com')) return faTiktok;
    if (url.includes('snapchat.com')) return faSnapchat;
    if (url.includes('reddit.com')) return faReddit;
    if (url.includes('github.com')) return faGithub;
    return null;
};

const getSocialName = (url: string): string | null => {
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('twitter.com')) return 'Twitter';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('pinterest.com')) return 'Pinterest';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('snapchat.com')) return 'Snapchat';
    if (url.includes('reddit.com')) return 'Reddit';
    if (url.includes('github.com')) return 'GitHub';
    return null;
};

const SocialLinksPage: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [newLink, setNewLink] = useState<string>('');
    const [editingLink, setEditingLink] = useState<{ id: number; url: string } | null>(null);
    const { id } = useParams<{ id: string }>();

    const fetchSocialLinks = async () => {
        try {
            const response = await axios.get(`https://api.discoun3ree.com/api/shops/${id}/social-links`);
            const parsedLinks = JSON.parse(response.data.social_links || '[]');

            const formattedLinks: SocialLink[] = parsedLinks.map((url: string, index: number) => ({
                id: index + 1,
                url,
            }));

            setSocialLinks(formattedLinks);
        } catch (error) {
            console.error('Error fetching social links:', error);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
    }, [id]);

    const addSocialLink = async () => {
        if (!newLink) return;

        try {
            const accessToken = localStorage.getItem('access_token');
            const updatedSocialLinks = [...socialLinks.map(link => link.url), newLink];

            await axios.put(
                `https://api.discoun3ree.com/api/shops/${id}/social-links`,
                {
                    social_links: updatedSocialLinks,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setNewLink('');
            fetchSocialLinks();
        } catch (error) {
            console.error('Error adding social link:', error);
        }
    };

    const updateSocialLink = async () => {
        if (!editingLink) return;

        try {
            const updatedLinks = socialLinks.map(link =>
                link.id === editingLink.id ? { ...link, url: editingLink.url } : link
            );

            await axios.put(
                `https://api.discoun3ree.com/api/shops/${id}/social-links`,
                {
                    social_links: updatedLinks.map(link => link.url),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );

            setEditingLink(null);
            fetchSocialLinks();
        } catch (error) {
            console.error('Error updating social link:', error);
        }
    };

    const deleteSocialLink = async (shopId: number, linkToDelete: string): Promise<void> => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await axios.delete<DeleteSocialLinkResponse>(`https://api.discoun3ree.com/api/shops/${shopId}/social-links`, {
                data: { link: linkToDelete },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log('Link deleted successfully:', response.data);
            fetchSocialLinks();
        } catch (error) {
            console.error('Error deleting social link:', error);
        }
    };

    return (
        <SellerLayout>
            <div className="w-full">
                <p className="mb-4 border-b w-full border-gray-300 text-gray-600 font-medium text-[18px]">
                    Social media links
                </p>
                <div className="mb-4 border rounded-full w-[350px] px-4 bg-transparent flex justify-between items-center py-2">
                    <input
                        type="url"
                        placeholder="Add a new social link..."
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className="bg-transparent outline-none w-[80%] text-gray-600 font-light text-[14px]"
                    />
                    <button onClick={addSocialLink} className="bg-green-100 text-green-500 p-2 rounded-full ">
                        <IoAddSharp />
                    </button>
                </div>
                {socialLinks.length === 0 ? (
                    <p className="text-gray-500">No social links available. Add one above!</p>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
                        {socialLinks.map(link => (
                            <div key={link.id} className="flex flex-col bg-white p-2 rounded-md ">
                                <div className='flex flex-col'>
                                    <span className="border-b border-gray-200 mb-2 pb-0.5">
                                        {getIcon(link.url) && (
                                            <FontAwesomeIcon icon={getIcon(link.url) as IconDefinition} className="mr-2" />
                                        )}
                                        {getSocialName(link.url)}
                                    </span>
                                    <div className="w-full overflow-hidden">
                                        <span className="truncate w-full">
                                            {link.url}
                                        </span>
                                    </div>
                                </div>
                                <div className='w-full justify-end flex'>
                                    <button
                                        onClick={() => deleteSocialLink(Number(id), link.url)}
                                        className="text-end justify-end text-red-500 bg-red-100 p-1 rounded-full"
                                    >
                                        <MdOutlineDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {editingLink && (
                    <div className="mt-4">
                        <input
                            type="url"
                            value={editingLink.url}
                            onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                            className="border rounded-md p-2 mr-2"
                        />
                        <button onClick={updateSocialLink} className="bg-green-500 text-white p-2 rounded-md">
                            Update
                        </button>
                    </div>
                )}
            </div>
        </SellerLayout>
    );
};

export default SocialLinksPage;
