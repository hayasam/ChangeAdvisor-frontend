import React, {Component} from 'react';
import {ProjectSelect} from "./project-select/ProjectSelect";
import './Projects.css';
import {Link} from "react-router-dom";
import Constants from "../Constants";
import axios from "axios/index";

export default class Projects extends Component {

    constructor() {
        super();

        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        const projectsUrl = `${Constants.SERVER_URL}/projects`;
        const promise = axios.get(projectsUrl);
        promise.then(res => {
            const responseBody = res.data;
            this.setState({projects: responseBody});
        });
    }

    render() {
        const {projects} = this.state;
        return (
            <div className={"col-md-12"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className={"card card-shadow"} style={{width: "20rem"}}>
                            <div className={"card-body"}>
                                <Link className={"card-link"} to='/new'>New Project</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6"}>
                        <ProjectSelect projects={projects} projectSelected={(id) => this.props.projectSelected(id)}/>
                    </div>
                </div>
            </div>
        )
    }
}