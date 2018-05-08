import React from 'react';
import {Link} from 'react-router-dom';
import './ProjectSelect.css';
import moment from 'moment';

export const ProjectSelect = ({projects, projectSelected, onProjectDeleteClicked}) => {
    return (
        <div className={"col-md-12"}>
            {
                projects.map(project => {
                        const {id: projectId, appName} = project;
                        return <ProjectCard key={projectId} projectId={projectId}
                                            project={project} appName={appName}
                                            projectSelected={(id) => projectSelected(id)}
                                            projectDeleteClicked={(id) => onProjectDeleteClicked(id)}
                        />
                    }
                )
            }
        </div>
    );
};

const ProjectCard = ({project, projectId, appName, projectSelected, projectDeleteClicked}) => {
    const {reviewsConfig, sourceConfig} = project;
    const lastReviewDate = reviewsConfig ? formatDate(reviewsConfig.lastReviewImport) : 'N/A';
    const lastImportDate = sourceConfig ? formatDate(sourceConfig.lastSourceImport) : 'N/A';

    return (
        <div className={"row project-card card-shadow"}
             onClick={() => projectSelected(projectId)}>

            <div className={"project-card-header clearfix"}>
                <button type="button" className={"close"} aria-label="Close"
                        onClick={() => projectDeleteClicked(projectId)}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4>
                    <Link to={`project/${projectId}`}>{appName}</Link>
                </h4>
                <div className={"project-card-dates pull-right"}>
                    Last review
                    import: {lastReviewDate}
                </div>
                <div className={"project-card-dates pull-right"}>
                    Last code
                    import: {lastImportDate}
                </div>
            </div>
        </div>
    )
};

function formatDate(dateString) {
    return moment(dateString).format('L, LTS')
}