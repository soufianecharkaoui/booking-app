import React from 'react';

const RenderServices = props => {

    return props.order.selectedServices.map(service => {
        return (
            <div className="item" key={service.id}>
                <div className="content">
                    {service.name}
                    <div className="description">{service.price}</div>
                </div>
            </div>
        );
    });
}

export default RenderServices;