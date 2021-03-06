import React from 'react';
import { TextContent, Text, TextVariants, TextList, TextListItem, TextListVariants, TextListItemVariants } from '@patternfly/react-core';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { releaseValues } from '../steps/imageOutput';
import { registerValues } from '../steps/registration';
import { googleAccType } from '../steps/googleCloud';

const ReviewStep = () => {
    const { getState } = useFormApi();
    return (
        <TextContent>
            <Text>
                    Review the information and click the Create button
                    to create your image using the following criteria.
            </Text>
            <Text component={ TextVariants.h3 }>Image output</Text>
            <TextList component={ TextListVariants.dl } data-testid='review-image-output'>
                <TextListItem component={ TextListItemVariants.dt }>Release</TextListItem>
                <TextListItem component={ TextListItemVariants.dd }>
                    {releaseValues?.[getState()?.values?.release]}
                </TextListItem>
            </TextList>
            <Text component={ TextVariants.h3 }>Target environment</Text>
            {getState()?.values?.['aws-account-id'] && <>
                <Text id="destination-header">Amazon Web Services</Text>
                <TextList component={ TextListVariants.dl } data-testid='review-image-upload-aws'>
                    <TextListItem component={ TextListItemVariants.dt }>Account ID</TextListItem>
                    <TextListItem component={ TextListItemVariants.dd }>{getState()?.values?.['aws-account-id']}</TextListItem>
                </TextList>
            </>}
            {getState()?.values?.['google-account-type'] && <>
                <Text id="destination-header">Google Cloud Platform</Text>
                <TextList component={ TextListVariants.dl } data-testid='review-image-upload-google'>
                    <TextListItem component={ TextListItemVariants.dt }>{
                        googleAccType?.[getState()?.values?.['google-account-type']]
                    }</TextListItem>
                    <TextListItem component={ TextListItemVariants.dd }>
                        {getState()?.values?.['google-email'] || getState()?.values?.['google-domain']}
                    </TextListItem>
                </TextList>
            </>}
            {getState()?.values?.['register-system'] === 'subscribe-now-radio' && <>
                <Text component={ TextVariants.h3 }>Registration</Text>
                <TextList component={ TextListVariants.dl } data-testid='review-image-registration'>
                    <TextListItem component={ TextListItemVariants.dt }>Subscription</TextListItem>
                    <TextListItem component={ TextListItemVariants.dd }>
                        {getState()?.values?.['register-system'] === 'subscribe-now-radio' ?
                            'Register the system on first boot' :
                        registerValues?.[getState()?.values?.['register-system']?.title]
                        }
                    </TextListItem>
                    <TextListItem component={ TextListItemVariants.dt }>Activation key</TextListItem>
                    <TextListItem component={ TextListItemVariants.dd } type="password">
                        {'*'.repeat(getState()?.values?.['subscription-activation']?.length)}
                    </TextListItem>
                </TextList>
            </>}
        </TextContent>
    );
};

export default ReviewStep;
