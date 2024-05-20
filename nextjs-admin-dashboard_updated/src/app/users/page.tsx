import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

export const metadata: Metadata = {
  title: "Users | Ameniti - Dashboard",
  description:
    "This is Users page for Ameniti Admin - Ameniti wind CSS Admin Dashboard",
};

interface IUsers {
  key: React.Key;
  request: number;
  chats: number;
  phone: string;
  firstname: string;
  lastname: string;
  age: number;
  times: string;
}

const mdColumns: TableColumnsType<IUsers> = [
  {
    title: 'Request',
    dataIndex: 'request',
  },
  {
    title: 'Chats',
    dataIndex: 'chats',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'First Name',
    dataIndex: 'firstname',
  },
  {
    title: 'Last Engaged on',
    dataIndex: 'times',
  },
];

const lgColumns: TableColumnsType<IUsers> = [
  {
    title: 'Request',
    dataIndex: 'request',
  },
  {
    title: 'Chats',
    dataIndex: 'chats',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'First Name',
    dataIndex: 'firstname',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Last Engaged on',
    dataIndex: 'times',
  },
];

const data: IUsers[] = [
  {
    key: '1',
    request: 1,
    chats: 20,
    phone: 'phone number',
    firstname: 'first name',
    lastname: 'last name',
    age: 50,
    times: 'logged time'
  },
  {
    key: '2',
    request: 1,
    chats: 20,
    phone: 'phone number2',
    firstname: 'first name1',
    lastname: 'last name1',
    age: 50,
    times: 'logged time'
  },
  {
    key: '3',
    request: 1,
    chats: 20,
    phone: 'phone number3',
    firstname: 'first name2',
    lastname: 'last name2',
    age: 50,
    times: 'logged time'
  },
  {
    key: '4',
    request: 1,
    chats: 20,
    phone: 'phone number4',
    firstname: 'first name3',
    lastname: 'last name3',
    age: 50,
    times: 'logged time'
  },
  {
    key: '5',
    request: 1,
    chats: 20,
    phone: 'phone number5',
    firstname: 'first name4',
    lastname: 'last name4',
    age: 50,
    times: 'logged time'
  },
];

const Users = () => {
  return (
    <DefaultLayout>
      <div className="max-w-250 overflow-x-auto">
        <Breadcrumb pageName="Users" />
        <Table className="md:block hidden" columns={lgColumns} dataSource={data} />
        <Table className="md:hidden block" columns={mdColumns} dataSource={data} />
      </div>
    </DefaultLayout>
  );
};

export default Users;
