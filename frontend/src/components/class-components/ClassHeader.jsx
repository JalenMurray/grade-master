import { AddCircleOutline, Delete, Edit, HelpOutline, ImportExport, Share } from '@mui/icons-material';
import BackButton from '../BackButton';
import ClassButton from './ClassButton';
import { useContext, useState } from 'react';
import { ClassContext } from '../../contexts/class';

// Class Modals
import ImportExportModal from './modals/ImportExportModal';
import NewAssignmentTypeModal from './modals/NewAssignmentTypeModal';
import PDFModal from './modals/PDFModal';
import EditClassModal from './modals/EditClassModal';
import FeaturesModal from './modals/FeaturesModal';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';

function ClassHeader() {
  const { cls, isGuest } = useContext(ClassContext);
  const [editClassModalOpen, setEditClassModalOpen] = useState(false);
  const [importExportModalOpen, setImportExportModalOpen] = useState(false);
  const [assignmentTypeModalOpen, setAssignmentTypeModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [featuresModalOpen, setFeaturesModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="ml-6">
      <BackButton text={cls.semester_str || 'Back'} />
      <h1 className="text-[48px] text-slate-gray px-10 py-4" style={{ color: cls.display_color }}>
        {isGuest ? 'Guest Class' : `${cls.code} ${cls.title}`}
      </h1>
      {!isGuest && <h4 className="text-xl px-10 text-slate-gray">{cls.semester_str}</h4>}
      <div className="px-10 pt-8 flex items-center gap-4 pb-12">
        {!isGuest && (
          <ClassButton
            icon={<Edit />}
            otherClasses={'w-32 h-16 text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800'}
            txt={'Edit Class'}
            onClick={() => setEditClassModalOpen(true)}
          />
        )}
        <ClassButton
          icon={<AddCircleOutline />}
          otherClasses={'w-32 h-16 text-white bg-green-600 hover:bg-green-700 active:bg-green-800'}
          txt={'New Assignment Type'}
          onClick={() => setAssignmentTypeModalOpen(true)}
        />
        <ClassButton
          icon={<HelpOutline />}
          otherClasses={'w-32 h-16 text-white bg-red-400 hover:bg-red-500 active:bg-red-600'}
          txt={'Features / Tutorial'}
          onClick={() => setFeaturesModalOpen(true)}
        />
        {/* <ClassButton
          icon={<Palette />}
          otherClasses={'w-32 h-16 text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800'}
          txt={'Customize Progress Bar'}
        /> */}
        <ClassButton
          icon={<ImportExport />}
          otherClasses={'w-32 h-16 text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900'}
          txt={'Import / Export'}
          onClick={() => setImportExportModalOpen(true)}
        />
        <ClassButton
          icon={<Share />}
          otherClasses={'w-32 h-16 text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700'}
          txt={'Share'}
          onClick={() => setPdfModalOpen(true)}
        />
        {!isGuest && (
          <ClassButton
            icon={<Delete />}
            otherClasses={'w-32 h-16 text-white bg-red-500 hover:bg-red-600 active:bg-red-700'}
            txt={'Delete Class'}
            onClick={() => setDeleteModalOpen(true)}
          />
        )}
      </div>
      {/* Button Modals */}
      <EditClassModal open={editClassModalOpen} setOpen={setEditClassModalOpen} />
      <NewAssignmentTypeModal open={assignmentTypeModalOpen} setOpen={setAssignmentTypeModalOpen} cls={cls.id} />
      <FeaturesModal open={featuresModalOpen} setOpen={setFeaturesModalOpen} />
      <ImportExportModal open={importExportModalOpen} setOpen={setImportExportModalOpen} />
      <PDFModal open={pdfModalOpen} setOpen={setPdfModalOpen} />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        msg={`Are you sure you want to delete ${cls.code} ${cls.title}`}
        url={`/classes/${cls.id}`}
        toLink={`/semester/${cls.semester}`}
      />
    </div>
  );
}

export default ClassHeader;
