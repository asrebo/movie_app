"use client"

import React, { useEffect, useState } from 'react';


export default function AnimiranNaslov({naslov = 'Trending Movies'}) {
    
    const characters = naslov.split('').map(char => (char === ' ' ? '\u00A0' : char));
    const [isAnimating, setIsAnimating] = useState(false);


    useEffect(() => {

        const timer = setTimeout(() => {
            setIsAnimating(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);


    return (
        <h1 className='big'>
            {characters.map((char, index) => {

                const animationClass = isAnimating ? 'letter-final' : 'letter-initial';

                return (
                    <span
                        key={index}
                        className={`letter-span ${animationClass}`}

                        style={{
                            transitionDelay: `${index * 20}ms`,
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </h1>

    );
};