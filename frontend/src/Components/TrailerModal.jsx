import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaSpinner, FaPlay } from 'react-icons/fa';

/**
 * TrailerModal Component - Displays movie trailers in a fullscreen modal
 * Developed by Sunny Kumar
 * Features:
 * - YouTube video embedding with direct video ID mapping
 * - Loading state with spinner animation
 * - Error handling with fallback message
 * - Keyboard navigation (Escape key to close)
 * - Prevents body scrolling when modal is open
 */

// Map of movie titles to YouTube trailer IDs
const TRAILER_MAP = {
    // Marvel movies
    'avengers': 'eOrNdBpGMv8',
    'avengers infinity war': 'QwievZ1Tx-8',
    'avengers endgame': 'TcMBFSGVi1c',
    'avengers age of ultron': 'tmeOjFno6Do',
    'the avengers': 'eOrNdBpGMv8',
    'ultimate avengers': 'JYUB2fW0hSM',
    'ultimate avengers ii': 'JYUB2fW0hSM',
    'captain america': 'JerVrbLldXw',
    'iron man': '8ugaeA-nMTc',
    'thor': 'JOddp-nlNvQ',
    'black panther': 'xjDjIWPwcPU',
    'doctor strange': 'HSzx-zryEgM',
    'guardians of the galaxy': 'd96cjJhvlMA',
    'spider-man': 'rk-dF1lIbIg',
    'ant-man': 'pWdKf3MneyI',

    // Star Wars
    'star wars': 'sGbxmsDFVnE',
    'the force awakens': 'sGbxmsDFVnE',
    'the last jedi': 'Q0CbN8sfihY',
    'the rise of skywalker': '8Qn_spdM5Zg',
    'rogue one': 'frdj1zb9sMY',

    // Harry Potter
    'harry potter': 'VyHV0BRtdxo',
    'sorcerers stone': 'VyHV0BRtdxo',
    'chamber of secrets': '1bq0qff4iF8',
    'prisoner of azkaban': 'lAxgztbYDbs',
    'goblet of fire': '3EGojp4Hh6I',

    // Default trailers for popular movies
    'inception': '8hP9D6kZseM',
    'the dark knight': 'EXeTwQWrcwY',
    'interstellar': 'zSWdZVtXT7E',
    'the godfather': 'sY1S34973zA',
    'pulp fiction': 's7EdQ4FqbhY',
    'the matrix': 'm8e-FF8MsqU',
    'jurassic park': 'QWBKEmWWL38',
    'titanic': 'kVrqfYjkTdQ',
    'avatar': '5PSNL1qE6VY',
    'forrest gump': 'bLvqoHBptjg',
    'the shawshank redemption': '6hB3S9bIaco',
    'the lion king': '7TavVZMewpY',
    'fight club': 'SUXWAEX2jlg',
    'goodfellas': '2ilzidi_J8Q',
    'the silence of the lambs': 'W6Mm8Sbe__o',
    'gladiator': 'owK1qxDselE',
    'saving private ryan': 'zwhP5b4tD6g',
    'schindlers list': 'gG22XNhtnoY',
    'the lord of the rings': 'V75dMMIW2B4',
    'the hobbit': 'SDnYMbYB-nU',
    'dune': 'n9xhJrPXop4',
    'batman': 'mqqft2x_Aa4',
    'joker': 'zAGVQLHvwOY',
    'wonder woman': 'VSB4wGIdDwo',
    'aquaman': 'WDkg3h8PCVU',
    'shazam': 'go6GEIrcvFY',
    'suicide squad': 'CmRih_VtVAs',
    'birds of prey': 'kGM4uYZzfu0',
    'venom': 'u9Mv98Gr5pY',
    'deadpool': 'ONHBaC-pfsk',
    'logan': 'Div0iP65aZo',
    'x-men': 'VNxwlx6etXI',
    'fantastic four': 'AAgnQdiZFsQ',
    'transformers': 'v8ItGrI-Ou0',
    'fast and furious': 'uisBaTkQAEs',
    'mission impossible': 'wb49-oV0F78',
    'james bond': 'BIhNsAtPbPI',
    'john wick': '2AUmvWm5ZDQ',
    'terminator': 'k64P4l2Wmeg',
    'predator': 'WaG1KZqrLvM',
    'alien': 'jQ5lPt9edzQ',
    'godzilla': 'QFxN2oDKk0E',
    'king kong': 'AYaTCPbYGdk',
    'pacific rim': 'K-ZcqwvQbas',
    'rambo': 'YPuhNtG47M8',
    'rocky': 'uR3FJv8oNMA',
    'die hard': 'jaJuwKCmJbY',
    'the terminator': 'k64P4l2Wmeg',
    'robocop': 'zbCbwP6ibR4',
    'the matrix': 'm8e-FF8MsqU',
    'blade runner': 'gCcx85zbxz4',
    'the fifth element': 'fQ9RqgcR24g',
    'total recall': 'WFMLGEHdIjE',
    'starship troopers': 'zPYuV_jGk7M',
    'the thing': '5ftmr17M-a4',
    'the fly': 'bdB02IufL5c',
    'the exorcist': 'YDGw1MTEe9k',
    'halloween': 'ek1ePFp-nBI',
    'a nightmare on elm street': 'dCVh4lBfW-c',
    'friday the 13th': 'vi6eOMS1J6A',
    'scream': 'AWm_mkbdpCA',
    'saw': 'S-1QgOMQ-ls',
    'the conjuring': 'k10ETZ41q5o',
    'insidious': 'zuZnRUcoWos',
    'paranormal activity': 'F_UxLEqd074',
    'the blair witch project': 'a_Hw4bAUj8A',
    'it': 'xKJmEC5ieOk',
    'the shining': '5Cb3ik6zP2I',
    'the grudge': 'O2NKzJHXbug',
    'the ring': 'yzR2GY-ew8I',
    'jaws': 'U1fu_sA7XhE',
    'jurassic world': 'RFinNxS5KN4',
    'godzilla': 'QFxN2oDKk0E',
    'kong skull island': 'YAbI4w95cTE',
    'pacific rim': 'K-ZcqwvQbas',
    'cloverfield': 'IvNkGm8mxiM',
    'district 9': 'DyLUwOcR5pk',
    'edge of tomorrow': 'vw61gCe2oqI',
    'arrival': 'tFMo3UJ4B4g',
    'gravity': 'OiTiKOy59o4',
    'the martian': 'ej3ioOneTy8',
    'interstellar': 'zSWdZVtXT7E',
    'ad astra': 'P6AaSMfXHbA',
    'first man': 'PSoRx87OO6k',
    'apollo 13': 'KtEIMC58sZo',
    'hidden figures': 'RK8xHq6dfAo',
    'the right stuff': 'ElzIPn1pXWE',
    'contact': 'SRoj3jK37Vc',
    'close encounters of the third kind': '4-i9CZ7DQpk',
    'e.t. the extra-terrestrial': 'qYAETtIIClk',
    'a.i. artificial intelligence': '_19pRsZRiz4',
    'ex machina': 'EoQuVnKhxaM',
    'her': 'ne6p6MfLBxc',
    'wall-e': 'alIq_wG9FNk',
    'the incredibles': 'eZbzbC9285I',
    'toy story': 'v-PjgYDrg70',
    'finding nemo': 'wZdpNglLe2Q',
    'up': 'ORFWdXl_zJ4',
    'inside out': 'yRUAzGQ3nSY',
    'coco': 'Rvr68u6k5sI',
    'soul': 'xOsLIiBStEs',
    'frozen': 'TbQm5doF_Uc',
    'moana': 'LKFuXETZUsI',
    'tangled': 'ip_0CFKTO9E',
    'beauty and the beast': 'e3Nl_TCQXuw',
    'the little mermaid': 'ZGZX5-PAwR8',
    'aladdin': 'eTjHiQKJUDY',
    'the lion king': '7TavVZMewpY',
    'mulan': 'KK8FHdFluOQ',
    'pocahontas': 'tvFh6sBUIeA',
    'hercules': 'g_xcvNcaJ_g',
    'tarzan': '5g8ykQLYnX0',
    'lilo & stitch': 'wAtaSKQ4-T0',
    'wreck-it ralph': 'btB8tb8fLYM',
    'zootopia': 'jWM0ct-OLsM',
    'big hero 6': 'z3biFxZIJOQ',
    'brave': 'TEHWDA_6e3M',
    'cars': 'SbXIj2T-_uk',
    'ratatouille': 'NgsQ8mVkN8w',
    'the good dinosaur': 'O-RgquKVTPE',
    'onward': 'gn5QmllRCn4',
    'luca': 'mYfJxlgR2jw',
    'encanto': 'CaimKeDcudo',
    'turning red': 'XdKzUbAiswE',
    'lightyear': 'BwZs3H_UN3k',
    'elemental': 'hXzcyx9V0xw',
};

const TrailerModal = ({ movieId, title, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    /**
     * Finds the appropriate YouTube video ID based on the movie title
     * Uses exact or partial matching against the TRAILER_MAP
     * Falls back to a default trailer if no match is found
     */
    useEffect(() => {
        try {
            // Clean the title for better matching
            const cleanTitle = title.replace(/[^\w\s]/gi, '').trim().toLowerCase();

            // Try to find a direct match in our map
            let foundVideoId = null;

            // Check for exact match
            if (TRAILER_MAP[cleanTitle]) {
                foundVideoId = TRAILER_MAP[cleanTitle];
            } else {
                // Check for partial matches
                for (const key in TRAILER_MAP) {
                    if (cleanTitle.includes(key) || key.includes(cleanTitle)) {
                        foundVideoId = TRAILER_MAP[key];
                        break;
                    }
                }
            }

            // If no match found, use a default popular trailer
            if (!foundVideoId) {
                foundVideoId = 'eOrNdBpGMv8'; // Default to Avengers trailer
            }

            setVideoId(foundVideoId);

            // Simulate loading for a consistent experience
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error setting up trailer:', error);
            setError(true);
            setLoading(false);
        }
    }, [title]);

    /**
     * Sets up keyboard event listeners and prevents body scrolling
     * Allows closing the modal with the Escape key
     * Restores body scrolling when the modal is closed
     */
    useEffect(() => {
        // Add event listener to close modal on escape key
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);

        // Prevent scrolling on body when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    /**
     * Handles clicks outside the modal content to close the modal
     * Only closes if the click is directly on the backdrop
     */
    const handleOutsideClick = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    // Create YouTube embed URL
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;

    /**
     * Renders the modal with header, content area, and YouTube iframe
     * Shows loading spinner while the video is being prepared
     * Displays error message if the trailer cannot be loaded
     */
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center"
            onClick={handleOutsideClick}
            ref={modalRef}
        >
            <div
                className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-900">
                    <h2 className="text-white text-xl font-bold">{title} - Trailer</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-red-600 transition-colors duration-300"
                        aria-label="Close"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Video Container */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <FaSpinner className="animate-spin text-red-600 text-5xl" />
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-center p-4">
                            <div>
                                <p className="text-xl mb-2">Unable to load trailer</p>
                                <p className="text-gray-400">Please try again later</p>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={youtubeEmbedUrl}
                                title={`${title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrailerModal; 