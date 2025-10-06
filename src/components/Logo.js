import React from 'react';
import { GiSprout } from 'react-icons/gi';

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <GiSprout className="text-forest-green text-4xl" />
            <span className="font-serif text-2xl font-bold tracking-tight">
        Soulful Living
      </span>
        </div>
    );
};

export default Logo;