/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { React, useState } from "@webpack/common";
interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    value?: string[];
    onChange: (selectedOptions: string[]) => void;
    minSelections?: number;
}

export function MultiSelect({ options, value = [], onChange, minSelections = 0 }: MultiSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
    const [isOpen, setIsOpen] = useState(false);

    function handleOptionChange(option: Option) {
        const newSelection = selectedOptions.includes(option.value)
            ? selectedOptions.filter(o => o !== option.value)
            : [...selectedOptions, option.value];

        if (newSelection.length >= minSelections) {
            setSelectedOptions(newSelection);
        }
    }

    React.useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions]);

    return (
        <div className="wrapper">
            <div className="select lookFilled" role="button" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
                <span className="value">
                    {selectedOptions.sort().join(", ").substring(0, 50)}
                </span>
                {isOpen ? (
                    /* Up Arrow indicator*/
                    <div className="icons">
                        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5.3 14.7a1 1 0 0 0 1.4 0L12 9.42l5.3 5.3a1 1 0 0 0 1.4-1.42l-6-6a1 1 0 0 0-1.4 0l-6 6a1 1 0 0 0 0 1.42Z"
                                className=""></path>
                        </svg>
                    </div>
                ) : (
                    /* Down arrow indicator*/
                    <div className="icons">
                        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"
                                className=""></path>
                        </svg>
                    </div>
                )}
            </div>

            {/*Make the options stacked vertically. Maximum 5 items tall, let me scroll if it's longer.*/}
            {/*Let me click either the checkbox or the text*/}
            {isOpen && (
                <div className="popout">
                    <div className="scrollerBase">
                        {options.map(option => (
                            <div key={option.value} className="option" onClick={() => handleOptionChange(option)}>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option.value)}
                                    readOnly
                                />
                                <label>{option.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
