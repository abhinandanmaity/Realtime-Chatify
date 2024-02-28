import React from 'react'
import ReactSelect from 'react-select'

const SelectProfile = ({
    label,
    value,
    onChange,
    options,
    disabled,
placeholder}) => {

    // console.log(options)

  return (
    <>
        <div className="">

        <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        isSearchable
        noOptionsMessage={()=> "No User Found"}
        placeholder={placeholder}
        options={options}

        styles={{
            placeholder: (baseStyles, state)=>({
                ...baseStyles, 
                color: "red",
                backgroundColor: "gray"
            })
        }}
        // menuPortalTarget={document.body}
        // styles={{
        //   menuPortal: (base) => ({ ...base, zIndex: 9999 })
        // }}
        // classNames={{
        //   control: () => 'text-sm',
        // }}
      />

        </div>
    </>
  )
}

export default SelectProfile