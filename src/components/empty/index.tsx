import React from 'react'

type Props = {}

function Empty({}: Props) {
  return (
    <div className='flex items-center justify-center'>
        <span className="text-xs text-gray-400">Không có tìm thấy dữ liệu!</span>
    </div>
  )
}

export default Empty