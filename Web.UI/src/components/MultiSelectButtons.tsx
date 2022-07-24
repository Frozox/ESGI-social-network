import React, {useState} from "react";

const MultiSelectButtons = ({options, label, setValue}: any) => {
    const [selectedItems, setSelected] = useState<string[]>([]);

    const addTag = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelected([...selectedItems, item]);
        } else {
            const filtered = selectedItems.filter((e) => e !== item);
            setSelected(filtered);
        }

    };
    return (
        <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                {label}
            </label>
            <div className="flex flex-wrap w-full justify-start gap-5 mt-5 mb-5">
                {options.map((optionValue: string) => {
                    return (
                        <span onClick={() => addTag(optionValue)}  {...(setValue('preferedLanguage',selectedItems))} className={`${selectedItems.includes(optionValue) ? 'bg-gray-100' : 'bg-white'} hover:border-gray-600 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow cursor-pointer`}  >{optionValue}</span>
                    )
                })}
            </div>
        </div>

    )
}

export default MultiSelectButtons;