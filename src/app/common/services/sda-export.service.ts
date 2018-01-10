import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData, ISdaListView, IBaseLookUp } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { SdaService } from '@app/common/services/sda.service';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AppStateService } from '@app/common/services/app-state.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//https://github.com/bpampuch/pdfmake/issues/948#issuecomment-293542550
//https://github.com/bpampuch/pdfmake/issues/948
//http://dataurl.net/#dataurlmaker
/*tslint:disable:max-line-length*/
pdfMake.vfs['Fontello.ttf'] = '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';

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Fontello: {
    normal: 'Fontello.ttf',
    bold: 'Fontello.ttf',
    italics: 'Fontello.ttf',
    bolditalics: 'Fontello.ttf'
  }
}
@Injectable()
export class SdaExportService {
  pdf: any;
  icon_check_empty = '';
  icon_circle_empty = '';
  icon_ok_squared = '';
  icon_dot_circled = '';
  new_line = '\n';
  constructor(private sdaService: SdaService) {
    this.pdf = pdfMake;
  }
  exportSda(sdas: number[]): void {
    const dd = {
      info: {
        title: 'Structural Defect Alert',
        author: 'American Airlines',
        subject: 'SDA',
        keywords: 'SDA, HSDA, Defect'
      },
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 100, 20, 60],
      pageSize: 'LETTER',

      header: {
        margin: 25,
        columns: [
          {

            table: {
              widths: ['50%', '50%'],

              body: [
                [
                  {
                    margin: [-600, 0, 0, 0],
                    alignment: 'left',
                    /*tslint:disable:max-line-length*/
                    image: 'data:image/png;base64,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'
                  },
                  //{ text: 'American Airlines', alignment: 'left', style: 'header' },

                  { text: 'Structural Defect Alert', alignment: 'right', style: 'header' }
                ],
                [

                  {
                    colSpan: 2,
                    text: 'For reporting criteria, procedures, and responsibilities, see MPPM section detailing Major Repair Reporting',
                    style: 'subheader',
                    alignment: 'center'
                  },

                ]
              ]
            },
            layout: 'noBorders'
          }



        ]



      },
      footer: function (currentPage, pageCount) {
        ///  return  currentPage.toString() + ' of ' + pageCount;
        return {
          margin: 8,
          columns: [
            {
              table: {
                widths: ['15%', '55%', '30%'],

                body: [
                  [
                    `Page ${currentPage} of ${pageCount}`,

                    { fontSize: 9, text: 'Immediately Fax form to reliability at Dialnet (480) 693-7155, \nand co-mail entire form to PHX/HG-REL', alignment: 'center' },
                    { text: 'ME-0308 (99-2000-3-0008) \nR1 12/10', alignment: 'right' }
                  ]
                ]
              },
              layout: 'noBorders'
            }
          ]
        };
      },
      content: [],
      styles: {
        header: {
          fontSize: 20,
          bold: true,

        },
        subheader: {
          fontSize: 8,
          bold: true,

        },
        sectionHeader: {
          fontSize: 10,
          bold: true,
          color: '#ffffff',
          background: '#000000',
          fillColor: '#000000'
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        icon: { font: 'Fontello' }
      }
    };
    // sdas = [113234, 112234];
    const final = Observable.combineLatest(sdas.map((sdaId, idx) => this.getSdaPdf(sdaId, idx)));
    final.subscribe(result => {
      dd.content = [result];
      this.pdf.createPdf(dd).download(sdas.length === 1 ? `${sdas[0]}.pdf` : 'sda.pdf');
    }, err => {
      console.log(err);
    })
    //Single
    //  this.getSdaPdf(sdas[0]).subscribe(result => {
    //    dd.content = [result];
    //    this.pdf.createPdf(dd).download(`${sdas[0]}.pdf`);
    //  });
  }

  getSdaPdf(sdaId: number, idx: number): Observable<any> {
    return this.sdaService.exportSda(sdaId).map(sda => {
      return [
        idx > 0 ? {
          text: '', pageBreak: 'before'
        } : {},
        {

          table: {
            widths: ['33%', '33%', '*'], heights: 40,
            body: [
              [
                { text: `SDR Number${this.new_line}${this.new_line}${sda.sdrNumber || ''}`, alignment: 'center' },
                { text: `ATA Code${this.new_line}${this.new_line}${sda.ataCode1}-${sda.ataCode1Desc} ${sda.ataCode2 % 100}-${sda.ataCode2Desc}`, alignment: 'center' },
                { text: `Alert Code${this.new_line}${this.new_line}${sda.alertCodeDesc}`, alignment: 'center' }
              ],

            ]
          }
        },
        this.new_line,
        this.getGeneralSection(sda),
        this.new_line,
        this.getDefectLocationSection(sda),
        this.new_line,
        this.getCPCPSection(sda),
        this.new_line,
        this.getCorrectiveActionSection(sda),
        this.new_line,
        this.getCPCPDispositionSection(sda),
        this.new_line,
        this.getDTESection(sda)
      ]
    })
  }

  getGeneralSection(sda: ISdaListView) {
    return {
      //layout: 'lightHorizontalLines',
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{ text: 'General Section', style: 'sectionHeader', colSpan: 4, margin: [2, 2, 2, 2] }, {}, {}, {}],
          [
            { text: 'SDA ID' }, { text: sda.id },
            { text: 'Line Maintenance' }, { text: sda.lineMaintenance ? this.icon_ok_squared : this.icon_check_empty, style: 'icon', alignment: 'center' },
          ],
          [
            { text: 'Create Date' }, { text: moment(sda.createDate).format('MM/DD/YYYY') },
            { text: 'Station' }, { text: sda.station },
          ],
          [
            { text: 'Department' }, { text: sda.departmentDesc },
            {
              text: ['Defect Discovered during', this.new_line,
                { text: sda.defectDiscoveredDuring === 'U' ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Unscheduled Maintenance', fontSize: 8 },
                ' ',
                { text: sda.defectDiscoveredDuring === 'S' ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Scheduled Maintenance  ', fontSize: 8 }
              ], colSpan: 2
            }
          ],
          [
            { text: 'Aircraft #' }, { text: sda.aircraftNo }, {
              text: sda.defectDiscoveredDuring === 'S' ? 'Check Type' : 'Description'
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.checkTypeDesc || '' : sda.unscheduledMaintenanceDescription || ''
            }
          ],
          [
            { text: 'Aircraft Manufacturer:' }, { text: sda.manufacturer }, {
              text: sda.defectDiscoveredDuring === 'S' ? 'ESM Reference #' : ''
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.esmReference || '' : ''
            }
          ],
          [
            { text: 'Aircraft Model/Series:' }, { text: sda.model }, {
              text: sda.defectDiscoveredDuring === 'S' ? ['Generated By Document:', this.new_line, 'Routine #'] : ['Non-Routine #']
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.routineNo || '' : sda.nonRoutineNo || ''
            }
          ],
          [
            { text: 'Serial #:' }, { text: sda.serialNo }, {
              text: sda.defectDiscoveredDuring === 'S' ? 'Non-Routine #' : 'MIC #'
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.nonRoutineNo || '' : sda.micNo || ''
            }
          ],
          [
            { text: 'Total Ship Time:' }, { text: sda.totalShipTime }, {}, {}
          ],
          [{ text: 'Cycles:' }, { text: sda.cycles }, {}, {}],
          [
            { text: 'Fleet:' }, { text: sda.fleet }, {}, {}
          ]
          ,
          [
            { text: 'Originator:' }, { text: sda.originator }, {}, {}
          ]

        ]
      }

    };
  }

  getDefectLocationSection(sda: ISdaListView) {
    return {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Description and Location of Defects or Damage',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            { text: 'Damage Type' }, { text: sda.damageTypeDesc },
            { text: 'Defect Size(in inches)', colSpan: 2 }
          ],
          [{ text: 'Damage Description', rowSpan: 3 },
          { text: sda.damageDescription, rowSpan: 3 },
          { text: 'Length' }, { text: sda.length }],
          ['', '', { text: 'Width' }, { text: sda.width }],
          ['', '', { text: 'Depth' }, { text: sda.depth }],
          [
            {
              text: ['Precise Location of Defect:', this.new_line, { text: '(Enter From/To if Applicable)', fontSize: 8 }],
              colSpan: 4
            }, '', '', ''
          ],
          [
            {
              text: ['Aircraft Station:', this.new_line, { text: sda.aircraftStation, fontSize: 8 }]
            },
            { text: ['Stringer:', this.new_line, { text: sda.stringer, fontSize: 8 }] },
            { text: ['WL:', this.new_line, { text: sda.waterLine, fontSize: 8 }] },
            { text: ['BL:', this.new_line, { text: sda.buttLine, fontSize: 8 }] }
          ],
          [
            { text: 'MFG Part #:' }, { text: sda.manufacturerPartNo || '' },
            { text: 'Part Defective:' }, { text: sda.partDefective || '' }
          ],
          [
            {
              colSpan: 4,
              layout: 'noBorders',
              table: {
                headerRows: 0,
                margin: [0, 0, 0, 0],
                widths: ['16%', '17%', '16%', '17%', '16%', '18%'],
                body: [
                  [
                    { text: 'MFG Serial #:' }, { text: sda.manufacturerSerialNo || '' },
                    { text: 'Part TT:' }, { text: sda.partTT || '' },
                    { text: 'Part TSO:' }, { text: sda.partTSO || '' },
                  ]
                ]
              }
            }, '', '', ''
          ],
          [
            { text: 'How Detected:' },
            {
              text: [sda.detectionMethodDesc,
              {
                text: sda.detectionMethodDesc === 'Other' ? `(${sda.detectionMethodOtherDescription})` : ''
              }
              ], colSpan: 3
            },
            {}, ''
          ],
        ]
      }
    };
  }
  getCPCPSection(sda: ISdaListView) {

    return {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Corrosion Prevention Control Program',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            { text: 'Is this a CPCP related event?' },
            {
              text: [
                { text: (sda.isCPCPRelatedEvent === true) ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Yes' },
                ' ',
                { text: (sda.isCPCPRelatedEvent === false) ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' No' }
              ], colSpan: 3
            },
            '', ''
          ],
          [
            { text: 'Widespread Corrosion?' },
            {
              text: [
                { text: (sda.isWideSpreadCorrosion === true) ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Yes' },
                ' ',
                { text: (sda.isWideSpreadCorrosion === false) ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' No' }
              ]
            },
            { text: 'Corrosion Level' },
            {
              text: [
                { text: sda.corrosionLevel === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 1' },
                ' ',
                { text: sda.corrosionLevel === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 2' },
                ' ',
                { text: sda.corrosionLevel === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 3' },
                ' ',
              ]
            },
          ],
          [
            { text: 'Corroded Area Previously Blended?' },
            {
              text: [
                { text: sda.isCPCPRelatedEvent ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Yes' },
                ' ',
                { text: !sda.isCPCPRelatedEvent ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' No' }
              ]
            },
            { text: 'Corrosion Task #' },
            {
              text: sda.corrosionTaskNo || ''
            },
          ],
          [
            { text: 'Type of Corrosion' },
            {
              text: [
                sda.corrosionTypeDesc || '',
                { text: sda.corrosionTypeDesc === 'Other' ? `(${sda.corrosionTypeOtherText})` : '' }

              ],
              colSpan: 3
            }, '', ''
          ],
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 1,
                margin: [0, 0, 0, 0],
                widths: ['33%', '33%', '34%'],
                body: [
                  [
                    { text: 'Cause of Damage:', colSpan: 3 }, '', ''
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(1, 'Environment', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(2, 'Lav/Galley Spill', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(4, 'Blocked Drain', sda.causesOfDamage)
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(8, 'Chemical Spill', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(16, 'Wet Insulation Blanket', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(32, 'Missing/Deteriorated Floorboard Tape', sda.causesOfDamage)
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(64, 'Correct Harware Not Installed', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(128, 'Deteriorated/Poor Sealing Practices', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(256, 'Missing Corrosion Inhibitor', sda.causesOfDamage)
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(512, 'Other', sda.causesOfDamage)
                    },
                    {
                      text: sda.causeOfDamageOtherText || '',
                      colSpan: 2
                    }, {}
                  ]
                ]
              }, colSpan: 4
            }, '', '', ''
          ],
          [
            { text: 'Floorboard condition after mat is removed:' },
            {
              text: sda.floorBoardConditionDesc || '', colSpan: 3
            }, '', ''
          ],
        ]
      }
    };
  }

  getCorrectiveActionSection(sda: ISdaListView) {
    const content = {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Corrective Action',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}
          ],
          [
            { text: 'Deferred' },
            {
              text: [
                { text: sda.isDeferred === true ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Yes' },
                ' ',
                { text: sda.isDeferred === false ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' No' }
              ],
              colSpan: 3
            }, '', ''
          ],
          [
            { text: 'SCEPTRE Deferral Code' },
            {
              text: sda.deferralCode || ''
            },
            { text: 'Deferral #' },
            {
              text: sda.deferralNo || ''
            }
          ],
          [
            {
              text: [
                { text: sda.repairType === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Defective Part Replaced With Identical Part #' },
                ' ',
                { text: sda.repairType === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Modified Part # Installed' },
                ' ',
                { text: sda.repairType === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Repaired (Describe)' },
              ], colSpan: 4
            }, '', '', ''
          ]
        ]
      }
    };
    if (sda.repairType === 1) {
      content.table.body.push([
        { text: 'Description' },
        {
          text: sda.defectivePartDescription || '',
          colSpan: 3
        },
      ]);
    }

    if (sda.repairType === 2) {
      content.table.body.push([
        { text: 'Description' },
        {
          text: sda.modifiedPartDescription || '',
          colSpan: 3
        },
      ]);
    }

    if (sda.repairType === 3) {
      content.table.body.push([
        { text: 'Description' },
        {
          text: sda.repairDescriptionTypeDesc || '',
          colSpan: 3
        },
      ]);
      content.table.body.push([
        { text: 'Repair Document:' },
        {
          text: sda.repairDocumentTypeDesc || '',
        },
        { text: 'Chap/Fig/Repair:' },
        {
          text: sda.chapFigRepairText || '',
        }
      ]);
      content.table.body.push([
        { text: 'Engineering Authorization (EA):' },
        {
          text: sda.engineeringAuthorization || '',
        },
        { text: 'Externally Visible?' },
        {
          text: [
            { text: sda.isExternallyVisible === true ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
            { text: ' Yes' },
            ' ',
            { text: sda.isExternallyVisible === false ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
            { text: ' No' }
          ]
        }
      ]);
      content.table.body.push([
        { text: 'Approximate External Doubler Repair Dimensions', colSpan: 4 }, {}, {}, {}
      ]);
      content.table.body.push([
        { text: 'Height(in inches):' },
        {
          text: sda.repairHeight || '',
        },
        { text: 'Width(in inches):' },
        {
          text: sda.repairWidth || '',
        }
      ]);
    }
    content.table.body.push([
      { text: 'Major Repair:' },
      {
        text: [
          { text: sda.isMajorRepair === true ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
          { text: ' Yes' },
          ' ',
          { text: sda.isMajorRepair === false ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
          { text: ' No' }
        ],
        colSpan: 3
      }, '', ''
    ]);
    content.table.body.push([
      { text: 'Description' },
      {
        text: sda.majorRepairDescription || '', colSpan: 3
      }, {}, {}
    ]);

    return content;
  }
  getCPCPDispositionSection(sda: ISdaListView) {
    const content = {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'CPCP Disposition',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            {
              text: [
                { text: sda.isNonCPCPRelatedEvent === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' },
                ' ',
                { text: 'Non-CPCP' },
              ], colSpan: 4
            }, '', '', ''
          ],
          [
            {
              text: 'Is CPCP Task # correct?'
            },
            {
              text: this.getBooleanContent(sda.isCorrosionTaskNoCorrect)
            },
            {
              text: 'Corrected CPCP Task #:'
            },
            {
              text: sda.correctedCorrosionTaskNo || ''
            }
          ],
          [
            {
              text: 'Is Corrosion Level correct?'
            },
            {
              text: this.getBooleanContent(sda.isCorrosionLevelCorrect)
            },
            {
              text: ['Corrected Corrosion Level:', this.new_line,
                {
                  text: [
                    { text: sda.correctedCorrosionLevel === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 1' },
                    ' ',
                    { text: sda.correctedCorrosionLevel === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 2' },
                    ' ',
                    { text: sda.correctedCorrosionLevel === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 3' },
                    ' ',
                  ]
                }, this.new_line,
                {
                  fontSize: 16,
                  color: '#ff0000',
                  text: 'See GPM 09.09 for corrosion level determinations'
                }

              ],
              rowSpan: 1
            }
            ,
            {
              fontSize: 8,
              text: [
                'Reason for level change:', this.new_line,
                { text: sda.corrosionLevelChangeReason === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Incorrect per Corrosion Level Block Diagram' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Evidence of a previous blend has been determined' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' New limits have been defined' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 4 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Pre-blended measurements indicate Level - 1; elected to replace part for company convenience' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 5 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Other' }, sda.corrosionLevelChangeReasonOtherText ? `(${sda.corrosionLevelChangeReasonOtherText})` : '', this.new_line,
              ], rowSpan: 1
            }
          ],
          [
            {
              text: 'Widespread Corrosion?'
            },
            {
              text: this.getBooleanContent(sda.isCPCPDWideSpreadCorrosion), colSpan: 3
            }, '', ''
          ],
          [
            'Engineering Comments', sda.engineeringComments || '',
            'QC Feedback', sda.qcFeedback || ''
          ],
          [
            {
              colSpan: 4,
              text: [
                { text: sda.submittedToQC ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Submit to QC'
              ]
            }, '', '', ''
          ],
          [
            {
              text: [
                { text: sda.isReviewComplete === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Review Complete'
              ]
            },
            {
              text: sda.reviewer || '', colSpan: 3
            }, '', ''
          ]
        ]
      }
    };

    return content;
  }
  getDTESection(sda: ISdaListView) {
    const content = {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Damage Tolerance Evaluation',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            { text: 'DTE Status:' }, { colSpan: 3, text: sda.dteStatusDesc || '' }, '', ''
          ],
          [
            { text: 'Total Ship Time:' }, { text: sda.dteTotalShipTime || '', colSpan: 3 }, '', ''
          ],
          [
            { text: 'Cycles:' }, { text: sda.dteCycles || '', colSpan: 3 }, '', ''
          ],
          [
            { text: 'Repair Insp. Status:' }, { text: sda.repairInspectionStatusDesc || '', colSpan: 3 }, '', ''
          ],
          [
            { text: 'Fatigue Critical?' }, {
              text: this.getBooleanContent(sda.isFatigueCritical), colSpan: 3
            }, {}, {}
          ],
          [
            { text: 'Stage 1/RTS Date:' }, { text: sda.stage1RTSDate ? moment(sda.stage1RTSDate).format('MM/DD/YYYY') : '', colSpan: 3 }, {}, {}
          ],
          [
            {
              text: [
                { text: sda.stage1Duration === 6 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 6 Months' }]
            },
            {
              text: [
                { text: sda.stage1Duration === 12 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 12 Months' }]
            },
            {
              text: [
                { text: sda.stage1Duration === 18 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 18 Months' }]
            },
            {
              text: [
                { text: sda.stage1Duration === 24 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 24 Months' }]
            }
          ],
          [
            { text: 'Stage 2 Approval Date:' }, { text: sda.stage2Date ? moment(sda.stage2Date).format('MM/DD/YYYY') : '' },
            { text: 'Stage 3 Approval Date:' }, { text: sda.stage3Date ? moment(sda.stage3Date).format('MM/DD/YYYY') : '' }
          ],
          [
            { text: 'SR #' }, { text: sda.srNumber || '' },
            { text: 'RDAS #:' }, { text: sda.rdasNumber || '' },
          ],
          [
            { text: 'ETD #:' }, { text: sda.etdNumber || '' },
            { text: 'ESM Sub/Item #:' }, { text: sda.esmSubItemNumber || '' },
          ],
          [
            this.getDTEThresholdsConent(sda)
          ],
          [
            this.getDTEMonitorItemsConent(sda)
          ],
          [
            { text: 'DTE Comments:' }, { text: sda.dteComments || '' },
            {
              text: [
                'QC Feedback:'
                , this.new_line,
                , this.new_line,
                , this.new_line,
                { text: sda.dteSubmittedToQC === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' },
                ' ',
                { text: 'Submit to QC' },
              ]
            }, { text: sda.dteqcFeedback || '' },
          ],
          [
            {
              colSpan: 4,
              layout: 'noBorders',
              table: {
                headerRows: 0,
                margin: [0, 0, 0, 0],
                widths: ['16%', '17%', '16%', '17%', '16%', '18%'],
                body: [
                  [
                    { text: 'Major Repair Updated By:' }, { text: sda.dteUpdatedBy || '' },
                    { text: 'Major Repair Updated Date:' }, { text: sda.dteUpdatedDate ? moment(sda.dteUpdatedDate).format('MM/DD/YYYY hh:mm A') : '' },
                    { text: 'DTE Due Date:' }, { text: sda.dueDate || '' },
                  ]
                ]
              }
            }, '', '', ''
          ]
        ]
      }
    };

    return content;
  }

  getDTEThresholdsConent(sda: ISdaListView) {
    const content = {
      colSpan: 4,
      table: {
        fontSize: 8,
        widths: ['10%', '30%', '30%', '30%'],
        headerRows: 2,
        body: [
          [
            { text: 'DTE Thresholds', colSpan: 4 }, '', '', ''
          ],
          [
            '', 'Inspection Threshold', 'Inspection Interval', 'Inspection Method'
          ],
          ['1', sda.dteInspectionThreshold1 || '', sda.dteInspectionInterval1 || '', sda.dteInspectionMethod1 || ''],
          ['2', sda.dteInspectionThreshold2 || '', sda.dteInspectionInterval2 || '', sda.dteInspectionMethod2 || ''],
          ['3', sda.dteInspectionThreshold3 || '', sda.dteInspectionInterval3 || '', sda.dteInspectionMethod3 || ''],
          ['4', sda.dteInspectionThreshold4 || '', sda.dteInspectionInterval4 || '', sda.dteInspectionMethod4 || ''],
          ['5', sda.dteInspectionThreshold5 || '', sda.dteInspectionInterval5 || '', sda.dteInspectionMethod5 || ''],
        ]
      }
    };

    return content;

  }

  getDTEMonitorItemsConent(sda: ISdaListView) {
    const content = {
      colSpan: 4,
      table: {
        fontSize: 8,
        widths: ['10%', '90%'],
        headerRows: 2,
        body: [
          [
            { text: 'DTE Monitor Items', colSpan: 2 }, ''
          ],
          [
            '', 'FMR/Logpage/MON'
          ],
          ['1', sda.dteMonitorItem1 || ''],
          ['2', sda.dteMonitorItem2 || ''],
          ['3', sda.dteMonitorItem3 || ''],
          ['4', sda.dteMonitorItem4 || ''],
          ['5', sda.dteMonitorItem5 || ''],
        ]
      }
    };

    return content;
  }

  getCauseOfDamageContent(val: number, text: string, currentVal: number): Array<any> {
    const content = [
      // tslint:disable-next-line:no-bitwise
      { text: ((currentVal & val) === 1) ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' ', { text: text },
    ]

    return content;
  }

  getBooleanContent(val: boolean) {
    return [
      { text: val === true ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
      { text: ' Yes' },
      ' ',
      { text: val === false ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
      { text: ' No' }
    ]
  }
}
