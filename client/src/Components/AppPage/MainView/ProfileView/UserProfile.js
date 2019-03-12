import React from "react";
import * as $ from "axios";

class UserProfile extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        employmentStatus: "",
        description: "",
        links: "",
        skills: "",
        location: ""
    }

    componentDidMount(){
        this.setState({user: this.props.profile});
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const profileId = localStorage.getItem("profileId");
        $({
            url: `/api/profiles/${profileId}`,
            method: "PUT",
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                description: this.state.description,
                employmentStatus: this.state.employmentStatus,
                location: this.state.location
            },
            headers: { 'Authorization': 'Bearer ' + this.props.accessToken }
        }).then((response) => {
            console.log(response);
        })
    }

    render() {
        return (
            <div className="card">
            <button type="button" onClick={this.props.handleCloseProfile} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
                <div className="card-body">
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="card-title form-control" value={this.state.firstName} onChange={this.handleChange} name="firstName"/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="card-title form-control" value={this.state.lastName} onChange={this.handleChange} name="lastName"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="card-text form-control" value={this.state.email} onChange={this.handleChange} name="email"/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input className="card-text form-control" value={this.state.phoneNumber} onChange={this.handleChange} name="phoneNumber"/>
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <input className="card-text form-control" value={this.state.description} onChange={this.handleChange} name="description"/>
                    </div>
                    {/* <div className="form-group">
                        <label>Links</label>
                        {this.state.links && (this.state.links.map((link, i) =>
                            <div key={i}>
                                <label>URL</label>
                                <input className="card-text form-control" value={this.state.links[i].URL} onChange={this.handleChange} />
                                <label>Description</label>
                                <input className="card-text form-control" value={this.state.links[i].linkDescription} onChange={this.handleChange} />
                            </div>))}
                    </div> */}
                    <div className="form-group">
                        <label>Employment Status</label>
                        <input className="card-text form-control" value={this.state.employmentStatus} onChange={this.handleChange} name="employmentStatus"/>
                    </div>
                    {/* <div className="form-group">
                        <label>Skills</label>
                        {this.state.skills.map((skill, i) =>
                            <div key={i}>
                                <label>Skill</label>
                                <input className="card-text form-control" value={this.state.skills[i].skillName} onChange={this.handleChange}/>
                                <label>Skill Level</label>
                                <input className="card-text form-control" value={this.state.skills[i].skillLevel} onChange={this.handleChange}/>
                            </div>)}
                    </div> */}
                    <div className="form-group">
                        <label>Location</label>
                        <input className="card-text form-control" value={this.state.location} onChange={this.handleChange} name="location"/>
                    </div>
                </div>
                <button onClick={this.handleSubmit}>Save Changes</button>
            </div>)
    }
}

export default UserProfile;