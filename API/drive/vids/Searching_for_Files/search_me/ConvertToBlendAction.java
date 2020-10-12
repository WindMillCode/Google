/*
 *  Copyright (c) 2009-2016 jMonkeyEngine
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are
 *  met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 *  * Neither the name of 'jMonkeyEngine' nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *  TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package com.jme3.gde.blender;

import com.jme3.gde.blender.filetypes.AbstractBlenderImportDataObject;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;
import org.openide.awt.ActionID;
import org.openide.awt.ActionReference;
import org.openide.awt.ActionReferences;
import org.openide.awt.ActionRegistration;
import org.openide.filesystems.FileObject;
import org.openide.loaders.MultiDataObject;
import org.openide.util.NbBundle.Messages;

@ActionID(
        category = "jMonkeyPlatform",
        id = "com.jme3.gde.blender.ConvertToBlendAction"
)
@ActionRegistration(
        displayName = "#CTL_ConvertToBlendAction"
)
@ActionReferences({
    @ActionReference(path = "Loaders/application/fbx/Actions", position = 150),
    @ActionReference(path = "Loaders/model/vnd.collada+xml/Actions", position = 150),
    @ActionReference(path = "Loaders/application/x-3ds/Actions", position = 150)
})
@Messages("CTL_ConvertToBlendAction=Convert to .blend file")

/**
 * The "Convert to .blend" Action is there for all files which are converted by the blender importers.
 * It allows you to convert an .fbx/.3ds file into a .blend file so that you can modify the file before the final .j3o import.
 *
 * @author MeFisto94
 */
public final class ConvertToBlendAction implements ActionListener {

    private final List<MultiDataObject> context;

    public ConvertToBlendAction(List<MultiDataObject> context) {
        this.context = context;
    }

    @Override
    public void actionPerformed(ActionEvent ev) {
        /* We need a context list because you can select multiple objects */
        for (MultiDataObject multiDataObject : context) {
            if (multiDataObject instanceof AbstractBlenderImportDataObject) {
                AbstractBlenderImportDataObject obj = (AbstractBlenderImportDataObject)multiDataObject;
                FileObject file = obj.importFile();
                // BlenderTool.openInBlender(file);
            }
        }
    }
}
