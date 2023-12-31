import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isEditOpenModallUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUsersFromReact()
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        console.log('response', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users

            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isEditOpenModallUser: !this.state.isEditOpenModallUser
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }
    handelDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    handelEditUser = async (user) => {
        console.log(user)
        try {
            this.setState({
                isEditOpenModallUser: true,
                userEdit: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    editUser = async (data) => {
        try {
            let response = await editUserService(data)
            if (response && response.errCode === 0) {
                this.setState({
                    isEditOpenModallUser: false
                })
                await this.getAllUsersFromReact();
            } else {
                alert(response.errCode)
            }

        } catch (error) {
            console.log(error)

        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                {this.state.isEditOpenModallUser && <ModalEditUser
                    isOpen={this.state.isEditOpenModallUser}
                    toggleFromParent={this.toggleEditUserModal}
                    editUser={this.editUser}
                    currentUser={this.state.userEdit}
                />}
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser} />
                <div className='title text-center'>Manage table</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => { this.handleAddNewUser() }}>
                        <i className='fas fa-plus'></i>
                        Add new user
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>

                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { this.handelEditUser(item) }}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => { this.handelDeleteUser(item) }}><i className="fas fa-trash-alt"></i></button>

                                        </td>

                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
