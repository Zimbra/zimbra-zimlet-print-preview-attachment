import { createElement } from 'preact';
import { useContext, useCallback } from 'preact/hooks';
import { Text, IntlContext } from 'preact-i18n';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';
import { ActionMenuItem } from '@zimbra-client/components';
import { Button, Icon } from '@zimbra-client/blocks';
import { callWith } from '@zimbra-client/util';
import ConfirmModal from './confirm-modal';

function createMore(props, context) {
   const { intl } = useContext(IntlContext);
   const zimletStrings = intl.dictionary['zimbra-zimlet-print-preview-attachment'];
   const importFromAttachmentHandler = useCallback(() => {
      importFromAttachment(props, context, zimletStrings)
   }, [props, context, zimletStrings]);
   const importFromCalendarMenuHandler = useCallback(() => {
      importFromCalendarMenu(props, context, zimletStrings)
   }, [props, context, zimletStrings]);
   if (props.attachment) {
      if (props.attachment.contentType === "application/pdf") {
         return (
            <div class={props.divClass}>
               <Button
                  class={props.buttonClass}
                  icon={<Icon name="download" style={props.iconClass} />}
                  iconPosition="left"
                  onClick={importFromAttachmentHandler}
               >
                  <Text id='zimbra-zimlet-print-preview-attachment.menuItem' />
               </Button>
            </div>);
      }
   }
}

function importFromAttachment(props, context, zimletStrings) {
   const modal = (
      <ConfirmModal
         onClose={callWith(removeModal, context)}
         onAction={callWith(removeModal, context)}
         zimletStrings={zimletStrings}
         iframeURL={props.attachment.url}
      />
   );
   const { dispatch } = context.store;
   dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'printModal', modal: modal }));
}

//implements closing of the dialog
function removeModal(context) {
   const { dispatch } = context.store;
   dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'printModal' }));
}

export default compose(withIntl())(createMore)
