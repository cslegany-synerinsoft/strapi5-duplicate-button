import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom"; //In react-router-dom v6 useHistory() is replaced by useNavigate().
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { Button } from "@strapi/design-system";
import { Duplicate } from "@strapi/icons";

const DuplicateButton = () => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { isSingleType, isCreatingEntry, contentType } = useContentManagerContext();
    if (isSingleType || isCreatingEntry || pathname.toLowerCase().endsWith("/create")) //isCreatingEntry can be false even though we're creating an entry
        return null;

    const uid = contentType?.uid ?? "";
    const { id } = useParams<{ id: string }>();

    const handleDuplicate = () => {
        const copyPathname = pathname.replace(uid, `${uid}/clone`);
        navigate(copyPathname, {
            state: { from: pathname },
        });
    };

    return (
        <>
            {id && (
                <Button variant="secondary" startIcon={<Duplicate />} onClick={handleDuplicate}>
                    {formatMessage({
                        id: "plugin.buttons.duplicate",
                        defaultMessage: "Duplicate",
                    })}
                </Button>
            )}
        </>
    );
}

export default DuplicateButton;