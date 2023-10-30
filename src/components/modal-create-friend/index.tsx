import React from 'react'
import Modal from '../modal'
import SearchName from './search-name'
import Tabs from '../tabs'

interface Props {
    open: boolean,
    onClose: () => void
}
const ModalSearchUser = (props: Props) => {
    return (
        <Modal open={props.open} onClose={props.onClose} className="w-screen h-screen rounded md:w-[500px] md:h-auto">
            <div className="flex justify-between items-center p-3 border-b">
                <h3 className="font-semibold text-lg">Thêm bạn</h3>
                <span onClick={props.onClose} className='flex w-8 h-8 items-center justify-center hover:bg-slate-100 cursor-pointer rounded-full'>
                    <i className="fa-solid fa-xmark text-xl"></i>
                </span>
            </div>
            <Tabs
                className='h-[calc(100%-57px-69px)] md:h-[300px]'
                classTabs='p-2 pt-4'
                classContent="p-2"
                data={[
                    {
                        title: "Tìm theo tên",
                        id: "1",
                        children: <SearchName onClose={props.onClose} />
                    },
                    {
                        title: "Tìm theo email",
                        id: "2",
                        children: <></>
                    },
                    {
                        title: "Tìm theo SĐT",
                        id: "3",
                        children: <></>
                    }
                ]} />

            <div className='flex justify-end items-center py-4 px-2'>
                <button className='p-2 px-6 bg-slate-100 mr-3'>
                    Huỷ
                </button>
                <button className='p-2 px-6 bg-blue-500 text-white mr-3'>
                    Tìm kiếm
                </button>
            </div>
        </Modal>
    )
}

export default ModalSearchUser